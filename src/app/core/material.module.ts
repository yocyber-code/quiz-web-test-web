import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

const THAI_DATE_FORMATS = {
  parse: {
    dateInput: 'LL', // Optional, use the desired format for parsing dates
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Set the desired date format here
    monthYearLabel: 'MMM YYYY', // Format for displaying the month and year in the header
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    // MatAutocompleteModule,
    // MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    MatMenuModule,
    // MatSidenavModule,
    MatToolbarModule,
    // MatDrawer,
    MatSidenavModule,
    MatAutocompleteModule,
    // MatDrawerContainer,
    // MatCardModule,
    // MatDividerModule,

    // MatGridListModule,
    // MatListModule,
    // MatStepperModule,
    // MatTabsModule,
    // MatTreeModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatBadgeModule,
    // MatChipsModule,
    // MatIconModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatRippleModule,
    // MatBottomSheetModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatTableModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  exports: [
    // MatAutocompleteModule,
    // MatCheckboxModule,

    MatDatepickerModule,
    MatExpansionModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    MatMenuModule,
    // MatSidenavModule,
    MatToolbarModule,
    MatDrawer,
    MatDrawerContainer,
    MatSidenavModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    // MatCardModule,
    // MatDividerModule,

    // MatGridListModule,
    // MatListModule,
    // MatStepperModule,
    // MatTabsModule,
    // MatTreeModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatBadgeModule,
    // MatChipsModule,
    // MatIconModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatRippleModule,
    // MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatTableModule,

    MatNativeDateModule, // <----- import for date formating(optional)
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  declarations: [],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },

    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' }, // Set the locale to Thai
    { provide: MAT_DATE_FORMATS, useValue: THAI_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
})
export class MaterialModule { }
