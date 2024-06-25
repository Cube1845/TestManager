import { Injectable } from '@angular/core';
import { Question } from '../../models/types/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  constructor() { }

  saveQuestion(question: Question, index: number) {
    
  }

  getQuestionBase(baseName: string): Question[] {
    return [
      { 
        content: 'Pytanie 1 cos tam cos tam',
        answers: [
          'Odp a',
          'Odp b',
          'Odp c',
          'Odp d'
        ],
        correctAnswer: 'a'
      },
      { 
        content: 'Pytanie 2 cos tam cos tam',
        answers: [
          'Odp a1',
          'Odp b1',
          'Odp c1',
          'Odp d1'
        ],
        correctAnswer: 'c'
      },
      { 
        content: 'Pytanie 3 cos tam cos tam awdawd awdAw Afaw AWdAwdA wdAWdAWd AWdAW AWdawdawd fAwd AWdawd AWd AwdAwd awad',
        answers: [
          'Odp a2',
          'Odp b2',
          'Odp c2',
          ''
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 4 cos tam cos tam',
        answers: [
          'Odp a3',
          'Odp b3',
          '',
          ''

        ],
        correctAnswer: 'd'
      },
      { 
        content: 'Pytanie 5 cos tam cos tamawdaw dawdawdawd awdawdawd awdawd',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 5 cos tam cos tam',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 5 cos tam cos tam',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 5 cos tam cos tam',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 5 cos tam cos tam',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
      { 
        content: 'Pytanie 5 cos tam cos tam',
        answers: [
          'Odp a4',
          'Odp b4',
          'Odp c4',
          'Odp d4',
        ],
        correctAnswer: 'b'
      },
    ];
  }
}
