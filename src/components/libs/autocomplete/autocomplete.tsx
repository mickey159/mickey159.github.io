import React, { Component, KeyboardEvent, MouseEvent, ChangeEvent, FocusEvent } from "react";
import classNames from "classnames";
import Chips from "../chips/chips";
import './autocomplete.scss';

interface DropDownProps {
    useCustomOptions: boolean,
    options: string[],
    doLocalFilter: boolean,
    isMultiSelect: boolean,
    selectedOptions: string[],
    onFilterValues: (e: string) => void,
    onSelect: (e: string) => void,
    children: any[]
};

interface DropdownState {
    options: string[],
    activeSuggestion: number,
    dropdownFilterString: string,
    showSuggestions: boolean
}

class Autocomplete extends Component<DropDownProps, DropdownState> {
    constructor(props : DropDownProps) {
      super(props);
      this.state = {
        activeSuggestion: 0,
        options: [],
        dropdownFilterString: "",
        showSuggestions: false
      };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) : void => {
        let dropdownFilterString = e.target.value;
    
        this.setState({
          activeSuggestion: 0,
          showSuggestions: true,
          dropdownFilterString: dropdownFilterString
        });

        if(this.props.doLocalFilter) this.setState({ options: 
            this.props.options.filter(value => value.includes(dropdownFilterString)) });
        else this.props.onFilterValues(dropdownFilterString);
    };

    onClick = (e: MouseEvent<HTMLElement>) : void => {
        this.props.onSelect((e.target as HTMLInputElement).innerText);
    };
    
    // onKeyDown = (e: KeyboardEvent<HTMLInputElement>) : void => {
    //     const { activeSuggestion, options } = this.state;
    //     console.log(activeSuggestion);
    //     if (e.keyCode === 13) {
    //       this.setState({
    //         activeSuggestion: 0,
    //         showSuggestions: false,
    //         dropdownFilterString: options[activeSuggestion]
    //       });
    //     } else if (e.keyCode === 38) {
    //       if (activeSuggestion === 0) return;
    //       this.setState({ activeSuggestion: activeSuggestion - 1 });
    //     }
    //     else if (e.keyCode === 40) {
    //       if (activeSuggestion - 1 === options.length) return;
    //       this.setState({ activeSuggestion: activeSuggestion + 1 });
    //     }
    // };

    // Handling input onFocus event
   focusHandler = (event: FocusEvent<HTMLInputElement>) => {
      this.setState({
      activeSuggestion: 0,
      showSuggestions: true
      });
   };

  // Handling input onBlur event
    blurHandler = (event: FocusEvent<HTMLFormElement>) => {
    this.setState({
      activeSuggestion: 0,
      showSuggestions: false
      });
  };

    render = () => (
        <form className="dropdown-wrapper" autoComplete="on">
            { this.props.isMultiSelect ? 
                <div className="input-selected-wrapper">
                    <Chips values={this.props.selectedOptions} />
                    <input type="text" onChange={this.onChange}
                           onFocus={this.focusHandler}
                           value={this.state.dropdownFilterString} />
                </div> : 
                <input type="text" onChange={this.onChange}
                          onFocus={this.focusHandler}
                       value={this.state.dropdownFilterString} />
            }
            { this.state.showSuggestions ? 
                this.props.options.length ? 
                <div className="autocomplete-items">
                    { this.props.useCustomOptions ? this.props.children :
                      this.props.options.map((value, index) =>
                        <div className={classNames({
                          "suggestion-active": index === this.state.activeSuggestion,
                          "selected": this.props.selectedOptions.includes(value)
                        })} 
                             key={index} onClick={this.onClick}>
                            {value}
                        </div>
                    )}
                </div> :
                <div className="no-items">
                    <em>No suggestions available.</em>
                </div>
              : <div></div>
            }
        </form>);
}
export default Autocomplete;