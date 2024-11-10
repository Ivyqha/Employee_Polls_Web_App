import { _saveQuestion, _saveQuestionAnswer} from './_DATA';
import { render, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';


import ProfileNav from './components/profileNav';
import CreateQuestion from './components/createquestion'; 
import Login from './components/login';
import Leaderboard from './components/leaderboard';

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
function formatQuestion(question){
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: question.author,
    optionOne: {
      votes: [],
      text: question.optionOneText,
    },
    optionTwo: {
      votes: [],
      text: question.optionTwoText,
    }
  }
}

const id = "8xf0y6ziyjabvozdd253nd";
const optionOne = 'Build our new application with Javascript';
const optionTwo = 'Build our new application with Typescript';
const author = 'sarahedo';
const user = 'sarahedo';
const mockStore = configureStore();

describe('_saveQuestion', () => {
  it('returns a question with all fields populated correctly', async() => {
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author
    }
    const expectedQuestion = formatQuestion(question);
    const result = await _saveQuestion(question);

    expect(typeof result.id).toBe('string');
    expect(result.id).toBeTruthy();
    delete result.id;
    delete expectedQuestion.id;

    expect(result).toEqual(expectedQuestion);
    expect(result.optionOne.text).toEqual(expectedQuestion.optionOne.text);
    expect(result.optionTwo.text).toEqual(expectedQuestion.optionTwo.text);
  });  ;
  
  it('throws an error when a field is missing', async () => {
    const incompleteQuestion = {
      optionOneText: 'Option One',
      author: 'Author'
    };
    await expect(_saveQuestion(incompleteQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
  });
  
});

describe('_saveQuestionAnswer', () => {
  const questions = {
    id: {
      author: author,
      optionOne: {
        votes: [],
        text: optionOne,
      },
      optionTwo: {
        votes: [],
        text: optionTwo,
      },
    }
  }
  const users = {
    user: {
      answers: {},
    }
  }
  it('resolves when all paramets are provided', async () => {
    const params = {
      authedUser: user,
      qid: id,
      answer: 'optionOne'
    };
    
    const result = await _saveQuestionAnswer(params);
    expect(result.authedUser).toEqual(users[user])
    expect(result.qid).toEqual(questions[id])
    expect(result.answer).toEqual(questions.id.optionOne.votes[user])
    expect(result.answer).toEqual(users.user.answers[id])
  });

  it('rejects when not all parameters are provided', async () => {
    const params = {
      authedUser: user,
      qid:id,
    };

    await expect(_saveQuestionAnswer(params)).rejects.toEqual('Please provide authedUser, qid, and answer');
  });
});

describe('ProfileNav', () => {
  const store = mockStore({
    authedUser: 'sarahedo',
    users: {
      'sarahedo':{
        name: 'Sarah Edo',
        avatarURL: 'https://gravatar.com/avatar/aa48413856561999ac26c16585832606?s=400&d=robohash&r=x'
      }
    }
  })

  it('matches the snapshot when a name and avatar are provided', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileNav />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  })
})

describe('Add Poll', () => {
  it('will display an error if one field is empty', () => {
    const store = mockStore()
    render(
      <Provider store={store}>
        <MemoryRouter>  
          <CreateQuestion />
        </MemoryRouter>
      </Provider>

    );
    const submitButton = screen.getByText('Submit');
    const optionOneInput = screen.getByLabelText('Option One');
    const optionTwoInput = screen.getByLabelText('Option Two');

    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    fireEvent.change(optionTwoInput, { target: { value: '' } });

    fireEvent.click(submitButton);
    expect(screen.getByTestId('error')).toHaveTextContent('Both fields are required');
  })
})

describe( 'Login', () => {
  it('verify that the submit button is present on the page', () => {
    const store = mockStore(); 
    render(
      <Provider store={store}>
        <MemoryRouter>  
          <Login />
        </MemoryRouter>
      </Provider>

    );
    const submitButton = screen.getByText('Sign In');
    expect(submitButton).toBeInTheDocument();
  })

  it('verify that a user is selected and set as authedUser', () => {
    const store = mockStore({
      authedUser: null,
      users: {
        'sarahedo':{
          name: 'Sarah Edo',
        }
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>  
          <Login />
        </MemoryRouter>
      </Provider>

    );
    const submitButton = screen.getByText('Sign In');
    const select = screen.getByTestId('user-select');
    fireEvent.change(select, { target: { value: 'sarahedo' } });
    fireEvent.click(submitButton);
    expect(select).toBeInTheDocument();
    expect(store.getActions()).toEqual([{ type: 'SET_AUTHED_USER', id: 'sarahedo' }]);
  })
})

describe('Leaderboard', () => {
  it('will verify that leaderboard is displaying the correct user name', () => {
    const users = {
      sarahedo:{ 
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: 'https://example.com/avatar.jpg',
        answers: {},
        questions: [],
      },
    };
    const store = mockStore({users})
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    const userName = screen.getByText('Sarah Edo');
    expect(userName).toBeInTheDocument();

  })

  it('will verify that leaderboard is displaying correct number of answered questions', () => {
    const users = {
      sarahedo:{ 
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: 'https://example.com/avatar.jpg',
        answers: {
          "8xf0y6ziyjabvozdd253nd": 'optionOne',
          "6ni6ok3ym7mf1p33lnez": 'optionTwo',
          "am8ehyc8byjqgar0jgpub9": 'optionTwo',
          "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: [],
      },
    };
    const store = mockStore({users})
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    const answeredQuestions = screen.getByText('4');
    expect(answeredQuestions).toBeInTheDocument();
  })
})
