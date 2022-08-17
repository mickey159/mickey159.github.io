import React from "react";
import Autocomplete from '../../libs/autocomplete/autocomplete';

interface Country { 
    name : { official : string }
}

class Flags extends React.Component <{}, { options: string[], selected: string[] }> {
    constructor(props: {}) {
        super(props);
    
        this.state = { options: [], selected: [""] };
    }

    filter_list = (filter_string : string) : void => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch(`https://restcountries.com/v3.1/${filter_string ? `name/${filter_string}`: "all"}?fields=name`, { signal })
            .then(response => {
                if (!response.ok) return [];
                else return response.json();
            }).then(data => data.map((country : Country) => country.name.official))
            .then(options => this.setState((state, props)=> ({ options })))
            .catch(console.log);
    }

    componentDidMount = () => this.filter_list("");

    on_filter_list = (e: React.ChangeEvent<HTMLInputElement>) : void => this.filter_list(e.target.value);
    on_select = (value : string) : void => {
        if(this.state.selected.includes(value)){
            this.setState({ selected: this.state.selected.filter(v => v != value )});
        }
        else this.setState({ selected: [...this.state.selected, value]});
    };

  render() {
    // React.useEffect(() => this.filter_list(""), []);
    const lst : string[] = ["a", "b"];
    return (
      <div>
        <h3>A Simple Rea ct Component Example with Typescript</h3>
        <div> 
        </div>
        <p>This component shows the Logrocket logo.</p>
        <p>For more info on Logrocket, please visit https://logrocket.com </p>
        {/* <Dropdown options={this.state.options} filter_list={this.on_filter_list} multiple={false} selected={[this.state.selected]}
                on_select={this.on_select} /> */}
        <Autocomplete options={this.state.options} doLocalFilter={false}
            onFilterValues={this.filter_list}
            useCustomOptions={false}
            isMultiSelect={true}
            onSelect={this.on_select}
            selectedOptions={this.state.selected} children={[]}></Autocomplete>
      </div>
    );
  }
}

export default Flags;
