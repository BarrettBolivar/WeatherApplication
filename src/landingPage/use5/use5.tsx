import * as React from 'react';

interface IProps {
  notYetDefined?: string;
}

interface IState {
  noDefinition?: number;
}

class UseFive extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    notYetDefined: ""
  };

  public state: IState = {
    noDefinition: 0
  };
  /*
  example function 
  public increase = () => {
    const countBy: number = this.props.countBy!;
    const count = this.state.count + countBy;
    this.setState({ count });
  };
  */

  public render() {
    return (
      <div>
        <div className='use5-container'>
        	<p>Coming Soon</p>
        </div>
      </div>
    );
  }
}

export default UseFive;