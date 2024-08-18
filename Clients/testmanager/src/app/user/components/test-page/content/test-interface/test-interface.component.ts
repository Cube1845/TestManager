import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionContentComponent } from './question-content/question-content.component';
import { QuestionSetSingletonService } from '../../../../services/singletons/question-set-singleton.service';
import { ProtectedQuestion } from '../../../../models/types/protectedQuestion';
import { UsernameSingletonService } from '../../../../services/singletons/username-singleton.service';
import { SelectedAnswersSingletonService } from '../../../../services/singletons/selected-answers-singleton.service';

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [QuestionContentComponent],
  templateUrl: './test-interface.component.html',
  styleUrl: './test-interface.component.scss',
})
export class TestInterfaceComponent implements OnInit, OnDestroy {
  constructor(
    private readonly questionSetSingleton: QuestionSetSingletonService,
    private readonly usernameSingleton: UsernameSingletonService,
    private readonly selectedAnswersSignleton: SelectedAnswersSingletonService
  ) {}

  currentQuestionContent: string = '';
  currentAnswerTexts: string[] = [];

  currentIndex = 0;

  nextPageButtonDisabled = false;

  setCurrentQuestionDataToDisplay(question: ProtectedQuestion) {
    this.currentQuestionContent = question.content;
    this.currentAnswerTexts = [];
    question.answers.forEach((answer) =>
      this.currentAnswerTexts.push(answer.text)
    );
  }

  ngOnInit(): void {
    this.setCurrentQuestionDataToDisplay(
      this.questionSetSingleton.getQuestion(this.currentIndex)!
    );
  }

  ngOnDestroy(): void {
    this.questionSetSingleton.setQuestionSet(null);
    this.usernameSingleton.setUsername(null);
    this.selectedAnswersSignleton.clearSelectedAnswers();
  }

  goToNextQuestion(): void {
    this.currentIndex++;
    this.setCurrentQuestionDataToDisplay(
      this.questionSetSingleton.getQuestion(this.currentIndex)!
    );

    if (
      this.questionSetSingleton.getQuestionSet()!.length - 1 <=
      this.currentIndex
    ) {
      this.nextPageButtonDisabled = true;
      return;
    }
  }

  goToPreviousQuestion(): void {
    this.currentIndex--;
    this.setCurrentQuestionDataToDisplay(
      this.questionSetSingleton.getQuestion(this.currentIndex)!
    );
    this.nextPageButtonDisabled = false;
  }
}
