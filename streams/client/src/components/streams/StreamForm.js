import React from "react";
import { Field, reduxForm } from "redux-form"; //这里Field大写是因为它是一个component。redux小写是因为它是一个函数，类似connect的函数，绑定action和mapStateToProps

class StreamForm extends React.Component {
    renderError = ({ touched, error }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    //meta上存储了输入元素的一些属性纸，是否被touch啊，是否有error啊之类的
    renderInput = ({ input, label, meta }) => {
        //在这里添加一些css属性，让表格有error产生时，对应的输入框也会有红色提示
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };
    render() {
        return (
            //这里form的的className上必须添加error这个样式，否则semantic UI会自动阻止显示表格上所有的error
            <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter title"
                ></Field>
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter description"
                ></Field>
                <button className="ui button primary" type="submit">
                    Submit
        </button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }
    if (!formValues.description) {
        errors.description = "You must enter a description";
    }
    return errors;
};

export default reduxForm({
    form: "StreamForm",
    validate
})(StreamForm);

