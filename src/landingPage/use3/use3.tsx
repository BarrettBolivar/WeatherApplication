import * as React from 'react';
import { apiCall } from '../../globalTypes/types';
import Map from '../Map/Map'

interface IUseThreeProps {
	apiInformation: apiCall;
	mapContainer: string;
	setMapContainer: (mapContainer: string) => void;
}

interface IUseThreeState {
	flipPanel: boolean;
	position: number[];
	apiInformation: apiCall;
  	noDefinition?: number;
}

class UseThree extends React.Component<IUseThreeProps, IUseThreeState> {

	public state: IUseThreeState = {
		flipPanel: true,
		position: [0, 0],
		apiInformation: {} as apiCall,
		noDefinition: 0
	};
	
	public componentDidUpdate (prevProps: IUseThreeProps) {
		if(prevProps.apiInformation !== this.state.apiInformation)
			this.setState({
				position: [this.props.apiInformation.coord ? this.props.apiInformation.coord.lat : 0, this.props.apiInformation.coord ?  this.props.apiInformation.coord.lon : 0],
				apiInformation: this.props.apiInformation
			})
	}

	public onClick = (e: string) => () => {
		this.props.setMapContainer(e);
		if(document.getElementById('map') && this.props.mapContainer !== 'use3') {
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
				<div className='use3-container' onClick={this.onClick('use3')}>
					{ this.state.flipPanel ?
						<>
							{ this.props.apiInformation.main ?
								<>
									<p>Humidity: {this.props.apiInformation.main.humidity}%</p>
									<p>Pressure: {this.props.apiInformation.main.pressure}</p>
								</>
								:
								<>
									<p>Humidity:</p>
									<p>Pressure:</p>
								</>
							}
						</>
						:
						<Map apiInformation={this.props.apiInformation} position={this.state.position} layer={'precipitation_new'}/>
					}
				</div>
			</div>
		);
	}
}

export default UseThree;