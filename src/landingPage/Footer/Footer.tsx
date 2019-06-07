import * as React from 'react';
import { TObject } from '../../globalTypes/types';

interface IProps {
  cookie: TObject;
}

interface IState {
  noDefinition?: number;
}

class Footer extends React.Component<IProps, IState> {

	public state: IState = {
		noDefinition: 0,
	};

	public render() {
		return (
			<div>
				{this.props.cookie.name ?
					<p>Name: {this.props.cookie.name} User Name: {this.props.cookie.userName} Please enable cookies for the site to work appropriately on reload.</p>
					:
					<p></p>
				}
			</div>
		);
	}
}

export default Footer;