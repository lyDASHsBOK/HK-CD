/**
 * Created by xinyiliu on 3/19/15.
 */

goog.provide("hkcd.features.main.v.QuestionMediator");
goog.require('bok.framework.core.BaseMediator');

goog.requireAll('hkcd.features.main.components.ui.QuestionPanel');


BOK.inherits(QuestionMediator, BaseMediator);

function QuestionMediator(questionPanel) {
    BaseMediator.call(this);

    /** @type {QuestionPanel}*/
    this.panel_ = questionPanel;
    this.questions = CONST.QUESTION;
    this.currentQuestionNo_ = 0;
    this.score_ = 0;

    this.panel_.nextBtn.click(Delegate.create(this, this.onNextClicked));
}

/**
 * @override
 * */
QuestionMediator.prototype.declareInterestedNotifications = function() {
    this.declareInterest(MainFeature.Notes.getInternalNote('QUESTION_START'), this.onQuestionStart);
};


/**
 * Notification Handler
 * */
QuestionMediator.prototype.onQuestionStart = function() {
    //index starts as -1 because the first page is introduction
    this.currentQuestionNo_ = -1;
    this.score_ = 0;
    this.panel_.showPanel('有奖知识问答', '欢迎来到有奖问答活动。答对所有问题可以获得主办方提供的精美奖品。点击下一页按钮开始答题。');
};

/**
 * Event handler
 * */
QuestionMediator.prototype.onNextClicked = function() {
    if(!this.checkResultUpdateScore_()) {
        return;
    }

    //prep next question
    this.currentQuestionNo_++;
    if(this.currentQuestionNo_ < this.questions.length) {
        var question = this.questions[this.currentQuestionNo_];
        var titleAppendix = question.correct.length > 1 ? ' (多选)' : '';
        this.panel_.showNextQuestion(question.title + titleAppendix, question.question, question.answer);
    } else {
        var questionNumber = this.questions.length;
        this.panel_.showNextQuestion('答题结束', '您答对了'+questionNumber+'道题中的'+this.score_+'道。谢谢您的参与。');
        this.panel_.nextBtn.hide();
    }
};

QuestionMediator.prototype.checkResultUpdateScore_ = function() {
    if(this.currentQuestionNo_ >= this.questions.length)
        return false;

    //skip index -1 as it's intro
    if(this.currentQuestionNo_ < 0)
        return true;

    //check result
    var answer = this.panel_.getCurrentAnswer();
    if (answer.length) {
        //check result
        var expected = this.questions[this.currentQuestionNo_].correct;
        if (expected.toString() == answer.toString()) {
            this.score_++;
        }

        return true;
    } else
        return false;
};

