import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionContentComponent } from './question-content/question-content.component';
import { QuestionSetSingletonService } from '../../../../services/singletons/question-set-singleton.service';
import { ProtectedQuestion } from '../../../../models/types/protectedQuestion';
import { SelectedAnswersSingletonService } from '../../../../services/singletons/selected-answers-singleton.service';
import { AnswerTileColorService } from '../../../../services/cosmetics/answer-tile-color.service';

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [QuestionContentComponent],
  templateUrl: './test-interface.component.html',
  styleUrl: './test-interface.component.scss',
})
export class TestInterfaceComponent implements OnInit {
  constructor(
    private readonly questionSetSingleton: QuestionSetSingletonService,
    private readonly selectedAnswersSingleton: SelectedAnswersSingletonService,
    private readonly answerTileColorService: AnswerTileColorService
  ) {}

  currentQuestion!: ProtectedQuestion;
  currentIndex = 0;

  nextPageButtonDisabled = false;
  showFinishTestButton = false;

  setCurrentQuestionWithFilteredAnswers(): void {
    var tempQuestion = this.questionSetSingleton.getQuestion(
      this.currentIndex
    )!;

    tempQuestion.answers = tempQuestion.answers.filter(
      (answer) => answer.text != ''
    );

    this.currentQuestion = tempQuestion;
  }

  ngOnInit(): void {
    this.setCurrentQuestionWithFilteredAnswers();
  }

  goToNextQuestion(): void {
    this.currentIndex++;
    this.setCurrentQuestionWithFilteredAnswers();

    var selectedAnswerIdInThisQuestion = -1;
    var selectedAnswers = this.selectedAnswersSingleton.getSelectedAnswers();

    if (selectedAnswers != null) {
      selectedAnswers.forEach((answer) => {
        if (answer.questionId == this.currentQuestion.questionId) {
          selectedAnswerIdInThisQuestion = answer.answerId;
        }
      });
    }

    this.answerTileColorService.setSelectedTile(
      this.getAnswerIndexInSpecifiedQuestion(
        selectedAnswerIdInThisQuestion,
        this.currentQuestion.questionId
      )
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
    this.setCurrentQuestionWithFilteredAnswers();
    this.nextPageButtonDisabled = false;

    var selectedAnswerIdInThisQuestion = -1;
    var selectedAnswers = this.selectedAnswersSingleton.getSelectedAnswers();

    if (selectedAnswers != null) {
      selectedAnswers.forEach((answer) => {
        if (answer.questionId == this.currentQuestion.questionId) {
          selectedAnswerIdInThisQuestion = answer.answerId;
        }
      });
    }

    this.answerTileColorService.setSelectedTile(
      this.getAnswerIndexInSpecifiedQuestion(
        selectedAnswerIdInThisQuestion,
        this.currentQuestion.questionId
      )
    );
  }

  getAnswerIndexInSpecifiedQuestion(
    answerId: number,
    questionId: number
  ): number {
    if (answerId == -1) {
      return -1;
    }

    var answerIndex = -1;

    if (this.currentQuestion.questionId == questionId) {
      for (let i = 0; i < this.currentQuestion.answers.length; i++) {
        if (this.currentQuestion.answers[i].answerId == answerId) {
          answerIndex = i;
        }
      }
    }

    return answerIndex;
  }

  selectOrDeselectAnswer(answerIndex: number): void {
    var answerAlreadySelected = false;
    var selectedAnswers = this.selectedAnswersSingleton.getSelectedAnswers();

    if (selectedAnswers != null) {
      selectedAnswers!.forEach((answer) => {
        if (
          answer.questionId == this.currentQuestion.questionId &&
          answer.answerId == this.currentQuestion.answers[answerIndex].answerId
        ) {
          answerAlreadySelected = true;
        }
      });
    }

    if (answerAlreadySelected) {
      this.selectedAnswersSingleton.deselectAnswer(
        this.currentQuestion.questionId
      );

      this.answerTileColorService.setSelectedTile(-1);
      this.changeFinishTestButtonVisibility();
      return;
    }

    this.selectedAnswersSingleton.selectAnswer(
      this.currentQuestion.questionId,
      this.currentQuestion.answers[answerIndex].answerId
    );

    this.answerTileColorService.setSelectedTile(answerIndex);

    this.changeFinishTestButtonVisibility();
  }

  changeFinishTestButtonVisibility(): void {
    if (
      this.selectedAnswersSingleton.getSelectedAnswers()!.length >=
      this.questionSetSingleton.getQuestionSet()!.length
    ) {
      this.showFinishTestButton = true;
    } else {
      this.showFinishTestButton = false;
    }
  }
}
