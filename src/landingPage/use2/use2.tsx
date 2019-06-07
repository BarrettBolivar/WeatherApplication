/* ts-lint: disable */
import * as React from 'react';
import { apiCall } from '../../globalTypes/types';
import Map from '../Map/Map'

interface IUseTwoProps {
	apiInformation: apiCall;
	mapContainer: string;
	setMapContainer: (mapContainer: string) => void;
}

interface IUseTwoState {
	flipPanel: boolean;
	position: number[];
	apiInformation: apiCall;
}

class UseTwo extends React.Component<IUseTwoProps, IUseTwoState> {

	public state: IUseTwoState = {
		flipPanel: true,
		position: [0, 0],
		apiInformation: {} as apiCall
	};

	/**
	 * lifecycle
	 */
	public componentDidUpdate (prevProps: IUseTwoProps) {
		if(prevProps.apiInformation !== this.state.apiInformation)
			this.setState({
				position: [this.props.apiInformation.coord ? this.props.apiInformation.coord.lat : 0, this.props.apiInformation.coord ?  this.props.apiInformation.coord.lon : 0],
				apiInformation: this.props.apiInformation
			})
	}

	/**
	 * onClick
	 * checks if map is in another container, displays map if not.
	 */
	public onClick = (e: string) => () => {
		this.props.setMapContainer(e);
		if(document.getElementById('map') && this.props.mapContainer !== 'use2') {
			alert('Please close the previous map before continuing to look at another map.');
			return;
		}
		const flipPanel = !this.state.flipPanel;
		this.setState({
			flipPanel
		});
	};


  	public render() {
		return (
			<div>
				<div className='use2-container' onClick={this.onClick('use2')}>
					{ this.state.flipPanel ?
							<>
								{ this.props.apiInformation.main ?
									<>
										<p>Temperature: {this.props.apiInformation.main.temp}°</p>
										<p>Min: {this.props.apiInformation.main.temp_min}° Max: {this.props.apiInformation.main.temp_max}°</p>
									</>
									:
									<>
										<p>Temperature: </p>
										<p>Min: Max:</p>
									</>
								}
							</>
							:
							<Map apiInformation={this.props.apiInformation} position={this.state.position} layer={'temp_new'}/>
					}
				</div>
			</div>
		);
  	}
}

export default UseTwo;