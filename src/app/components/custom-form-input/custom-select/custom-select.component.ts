import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import * as uuid from 'uuid';
import { Observable } from 'rxjs';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('50ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('50ms', style({ transform: 'translateY(-10px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class CustomSelectComponent implements OnInit, AfterViewInit {
  constructor(private readonly coreService: CoreService) {}
  @HostListener('window:click', ['$event.target']) onClick(e: any) {
    this.toggleOn = this.selectContainer.nativeElement.contains(e) ? this.toggleOn : false;
  }

  @ViewChild('selectContainer', { read: ElementRef }) selectContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('selectLabel', { read: ElementRef }) selectLabel!: ElementRef<HTMLLabelElement>;
  @ViewChild('selectInput', { read: ElementRef }) selectInput!: ElementRef<HTMLInputElement>;

  @Input() required: boolean = false;
  @Input() hideRequired: boolean = false;
  @Input() model: string | null = null;
  @Input() placeholder: string = 'โปรดเลือก';
  @Input() options: any[] | Function = [];
  @Input() containerClass: string = '';
  @Input() labelClass: string = '';
  @Input() inputClass: string = '';
  @Input() searchable: boolean = false;
  @Input() label: string = '';
  @Input() optionsAsync: Observable<SelectorOption[]> | null = null;
  @Input() sideLabel: boolean = false;
  @Input() bufferOption: SelectorOption[] = [];
  @Output() modelChange = new EventEmitter();
  itemOptions!: SelectorOption[];

  bufferTempOption: SelectorOption[] = [];
  optuiTempOption: SelectorOption[] = [];
  componentID!: string;
  selected_name: string | null = null;
  toggleOn: boolean = false;
  default_value: string = '';

  async ngOnInit(): Promise<void> {
    this.default_value = this.model ?? '0';
    this.componentID = uuid.v4() + '_select';
    if (this.optionsAsync) {
      this.optionsAsync.subscribe((options: SelectorOption[]) => {
        this.itemOptions = options;

        this.bufferTempOption = options;
        this.model = this.default_value;
        if (this.model && this.itemOptions.length !== 0) {
          this.selectOption(this.itemOptions.find((option) => option.id === this.model) ?? null);
        }
      });
    } else if (this.options instanceof Function) {
      this.itemOptions = await this.options();
    } else {
      this.itemOptions = this.options;
    }
    if (this.model && this.options.length > 0) {
      this.selectOption(this.itemOptions.find((option) => option.id === this.model) ?? null);
    }
    this.bufferOption = this.itemOptions;
  }

  ngAfterViewInit(): void {
    this.mergeClass();
  }

  toggleOptions() {
    if (this.itemOptions.length === 0) {
      this.toggleOn = false;
      return;
    }
    this.toggleOn = !this.toggleOn;
  }

  selectOption(option: SelectorOption | null) {
    this.model = option ? option.id : null;
    this.selected_name = option ? option.name : null;
    this.modelChange.emit(this.model);
    this.toggleOn = false;
  }

  searchOptions(event: any) {
    const value = event.target.value;
    
    if (this.bufferTempOption.length > 0) {
      this.itemOptions = this.bufferTempOption.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase()),
      );
    } else {
      var tempList: any = this.options;
      this.itemOptions = tempList.filter((option: any) => option.name.toLowerCase().includes(value.toLowerCase()));
    }
  }

  private mergeClass(): void {
    const defaultContainerClass = this.selectContainer?.nativeElement.className.split(' ');
    const defaultLabelClass = this.selectLabel?.nativeElement.className.split(' ');
    const defaultInputClass = this.selectInput?.nativeElement.className.split(' ');
    const mergeContainerClass = this.coreService.utilities.tailwind
    .tailwindMerge(this.selectContainer?.nativeElement.className, this.containerClass)
    .split(' ');
    const mergeLabelClass = this.coreService.utilities.tailwind
    .tailwindMerge(this.selectLabel?.nativeElement.className, this.labelClass)
    .split(' ');
    const mergeInputClass = this.coreService.utilities.tailwind
    .tailwindMerge(this.selectInput?.nativeElement.className, this.inputClass)
    .split(' ');

    this.coreService.utilities.tailwind.removeClass(this.selectContainer?.nativeElement, defaultContainerClass);
    this.coreService.utilities.tailwind.addClass(this.selectContainer?.nativeElement, mergeContainerClass);
    this.coreService.utilities.tailwind.removeClass(this.selectLabel?.nativeElement, defaultLabelClass);
    this.coreService.utilities.tailwind.addClass(this.selectLabel?.nativeElement, mergeLabelClass);
    this.coreService.utilities.tailwind.removeClass(this.selectInput?.nativeElement, defaultInputClass);
    this.coreService.utilities.tailwind.addClass(this.selectInput?.nativeElement, mergeInputClass);
  }
}

export interface SelectorOption {
  id: string;
  name: string;
}
