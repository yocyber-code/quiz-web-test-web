import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CoreService } from '../../core/core.service';
import { Router } from '@angular/router';
import { get } from 'lodash';
import { QuizSendDTO } from '../../../shared/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
})
export class QuizPageComponent {
  constructor(private readonly coreService: CoreService, private readonly router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.checkSubmit();
    await this.getQuiz();
    this.setForms();
  }

  async checkSubmit() {
    const identity = this.coreService.utilities.storage.getIdentity();
    if (!identity) {
      this.router.navigate(['/home']);
    }
    const resp = await this.coreService.api.quiz.getSummary(identity.id, identity.username, identity.group_id);
    if (resp.results) {
      this.router.navigate(['/summary']);
    }
  }

  quiz: any[] = [];
  quizIdList: number[] = [];

  async getQuiz() {
    const identity = this.coreService.utilities.storage.getIdentity();
    const resp = await this.coreService.api.quiz.getQuiz(identity.id, identity.username, identity.group_id);
    if (resp.results) {
      this.quiz = resp.results;
      this.quiz.forEach((element: any) => {
        this.quizIdList.push(element.id);
      });
    }

    const respLoad = await this.coreService.api.quiz.loadSave(identity.id, identity.username, identity.group_id);
    if (respLoad.results) {
      const save: any[] = respLoad.results;
      save.forEach((element: any) => {
        const index = this.quizIdList.indexOf(element.question_id);
        if (index !== -1) {
          this.model[`quiz${index + 1}`] = Number(element.choice_id);
        }
      });
    }
  }

  form: FormGroup = new FormGroup({});
  model: any = {
    quiz1: null,
    quiz2: null,
    quiz3: null,
    quiz4: null,
    quiz5: null,
  };

  fields: FormlyFieldConfig[] = [];

  async setForms() {
    const field = [
      {
        fieldGroupClassName: 'grid grid-cols-2 gap-y-2 gap-x-4 mt-8',
        fieldGroup: [
          {
            key: 'quiz1',
            type: 'quizField',
            className: 'col-span-2',
            props: {
              order: 1,
              question: this.quiz[0].question,
              choices: this.quiz[0].choices,
            },
          },
          {
            key: 'quiz2',
            type: 'quizField',
            className: 'col-span-2',
            props: {
              order: 2,
              question: this.quiz[1].question,
              choices: this.quiz[1].choices,
            },
          },
          {
            key: 'quiz3',
            type: 'quizField',
            className: 'col-span-2',
            props: {
              order: 3,
              question: this.quiz[2].question,
              choices: this.quiz[2].choices,
            },
          },
          {
            key: 'quiz4',
            type: 'quizField',
            className: 'col-span-2',
            props: {
              order: 4,
              question: this.quiz[3].question,
              choices: this.quiz[3].choices,
            },
          },
          {
            key: 'quiz5',
            type: 'quizField',
            className: 'col-span-2',
            props: {
              order: 5,
              question: this.quiz[4].question,
              choices: this.quiz[4].choices,
            },
          },
        ],
      },
    ];

    this.fields = this.coreService.utilities.form.getFormField(field);
  }

  submit() {
    if (this.model.quiz1 && this.model.quiz2 && this.model.quiz3 && this.model.quiz4 && this.model.quiz5) {
      this.coreService.utilities.alert.confirm('Are you sure you want to save the quiz?').then(async (confirm) => {
        if (confirm) {
          const identity = this.coreService.utilities.storage.getIdentity();
          const quizSendDTO: QuizSendDTO = {
            id: identity.id,
            username: identity.username,
            group_id: identity.group_id,
            save: [],
          };
          this.quizIdList.forEach((element: number, index: number) => {
            if (get(this.model, `quiz${index + 1}`) !== null) {
              quizSendDTO.save.push({
                question_id: element,
                choice_id: get(this.model, `quiz${index + 1}`),
              });
            }
          });
          const resp = await this.coreService.api.quiz.submit(quizSendDTO);
          if (resp.results) {
            this.coreService.utilities.alert.alert('Quiz submit successfully');
            setTimeout(() => {
              this.router.navigate(['/summary']);
            }, 1000);
          }
        }
      });
    } else {
      this.coreService.utilities.alert.alert('You have to complete the questions');
    }
  }

  save() {
    this.coreService.utilities.alert.confirm('Are you sure you want to save the quiz?').then(async (confirm) => {
      if (confirm) {
        const identity = this.coreService.utilities.storage.getIdentity();
        const quizSendDTO: QuizSendDTO = {
          id: identity.id,
          username: identity.username,
          group_id: identity.group_id,
          save: [],
        };
        this.quizIdList.forEach((element: number, index: number) => {
          if (get(this.model, `quiz${index + 1}`) !== null) {
            quizSendDTO.save.push({
              question_id: element,
              choice_id: get(this.model, `quiz${index + 1}`),
            });
          }
        });
        const resp = await this.coreService.api.quiz.save(quizSendDTO);
        if (resp.results) {
          this.coreService.utilities.alert.alert('Quiz saved successfully');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
      }
    });
  }
}
