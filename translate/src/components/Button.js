import React from "react";
import LanguageContext from "../contexts/LanguageContext";
import ColorContext from "../contexts/ColorContext";

class Button extends React.Component {
  //默认方式，单一context object 情况
  //绑定language context到Button这个组件上
  //static contextType = LanguageContext;

  renderSubmit(value) {
    return value === "english" ? "Submit" : "Voorleggen";
  }

  renderButton(color) {
    return (
      <button className={`ui button ${color}`} >
        <LanguageContext.Consumer>
          {({ language }) => this.renderSubmit(language)}
        </LanguageContext.Consumer>
      </button >
    );
  }

  render() {
    //默认方式，单一context object 情况
    //const text = this.context === "english" ? "Submit" : "Voorleggen";
    return (
      <ColorContext.Consumer>
        {color => this.renderButton(color)}
      </ColorContext.Consumer>
    );
  }
}

export default Button;
