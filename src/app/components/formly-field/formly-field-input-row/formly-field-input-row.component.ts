import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { CoreService } from '../../../core/core.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-formly-field-input-row',
  templateUrl: './formly-field-input-row.component.html',
  styleUrls: ['./formly-field-input-row.component.scss'],
})
export class FormlyFieldInputRowComponent extends FieldType<FieldTypeConfig> implements OnInit, AfterViewInit {
  @ViewChild('selectContainer', { read: ElementRef }) selectContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('selectLabel', { read: ElementRef }) selectLabel!: ElementRef<HTMLLabelElement>;
  @ViewChild('selectInput', { read: ElementRef }) selectInput!: ElementRef<HTMLInputElement>;
  _SecurityContext :any = SecurityContext;
  elementID!: string;
  icon: string = '';
  imask!: any;
  pattern!: string | RegExp;
  type!: string;
  maxLength!: number;
  minLength!: number;
  disabled!: boolean;
  placeholder!: string;
  required!: boolean;
  hideRequired!: boolean;
  onInput! : Function;

  constructor(
    public sanitizer: DomSanitizer,
    private readonly coreService: CoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.elementID = uuid.v4() + '_input';
    this.icon = this.props['icon'] ?? '';
    this.imask = this.props['imask'] ?? null;
    this.pattern = this.props['pattern'] ?? '';
    this.type = this.props['type'] ?? 'text';
    this.maxLength = this.props['maxLength'] ?? 100;
    this.minLength = this.props['minLength'] ?? 0;
    this.disabled = this.props['disabled'] ?? false;
    this.placeholder = this.props['placeholder'] ?? '';
    this.required = this.props['required'] ?? false;
    this.hideRequired = this.props['hideRequired'] ?? false;
    this.onInput = this.props['onInput'] ?? function() {};
  }

  ngAfterViewInit(): void {
    this.mergeClass();
  }

  onChange(): void {
    this.onInput(this.formControl.value);
  }

  private mergeClass(): void {
    const defaultContainerClass = this.selectContainer?.nativeElement.className.split(' ');
    const defaultLabelClass = this.selectLabel?.nativeElement.className.split(' ');
    const defaultInputClass = this.selectInput?.nativeElement.className.split(' ');
    const mergeContainerClass = this.coreService.utilities.tailwind
      .tailwindMerge(this.selectContainer?.nativeElement.className, this.props['containerClass'] ?? '')
      .split(' ');
    const mergeLabelClass = this.coreService.utilities.tailwind
      .tailwindMerge(this.selectLabel?.nativeElement.className, this.props['labelClass'] ?? '')
      .split(' ');
    const mergeInputClass = this.coreService.utilities.tailwind
      .tailwindMerge(this.selectInput?.nativeElement.className, this.props['inputClass'] ?? '')
      .split(' ');

    this.coreService.utilities.tailwind.removeClass(this.selectContainer?.nativeElement, defaultContainerClass);
    this.coreService.utilities.tailwind.addClass(this.selectContainer?.nativeElement, mergeContainerClass);
    this.coreService.utilities.tailwind.removeClass(this.selectLabel?.nativeElement, defaultLabelClass);
    this.coreService.utilities.tailwind.addClass(this.selectLabel?.nativeElement, mergeLabelClass);
    this.coreService.utilities.tailwind.removeClass(this.selectInput?.nativeElement, defaultInputClass);
    this.coreService.utilities.tailwind.addClass(this.selectInput?.nativeElement, mergeInputClass);
  }
}
