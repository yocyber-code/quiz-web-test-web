import { Injectable } from '@angular/core';
import { CoreService } from '../../../app/core/core.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private readonly coreService: CoreService) {}

  private readonly path = 'quiz/';

  public async getQuiz(id: number, username: string, group_id: number) {
    const params = {
      id: id,
      username: username,
      group_id: group_id,
    };
    const resp = await this.coreService.utilities.http.get(this.path + 'quiz', params);
    return resp;
  }

  public async getSummary(id: number, username: string, group_id: number) {
    const params = {
      id: id,
      username: username,
      group_id: group_id,
    };
    const resp = await this.coreService.utilities.http.get(this.path + 'summary', params);
    return resp;
  }

  public async loadSave(id: number, username: string, group_id: number) {
    const params = {
      id: id,
      username: username,
      group_id: group_id,
    };
    const resp = await this.coreService.utilities.http.get(this.path + 'load', params);
    return resp;
  }

  public async save(body: QuizSendDTO) {
    const resp = await this.coreService.utilities.http.post(this.path + 'save', body);
    return resp;
  }

  public async submit(body: QuizSendDTO) {
    const resp = await this.coreService.utilities.http.post(this.path + 'submit', body);
    return resp;
  }
}

export interface QuizSendDTO {
  id: number;
  username: string;
  group_id: number;
  save: ChoiceSendDTO[];
}

export interface ChoiceSendDTO {
  question_id: number;
  choice_id: number;
}
