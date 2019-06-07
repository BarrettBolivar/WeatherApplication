import * as React from 'react';
import { apiCall } from '../../globalTypes/types';
import Map from '../Map/Map'

interface IUseFourProps {
	apiInformation: apiCall;
	mapContainer: string;
	setMapContainer: (mapContainer: string) => void;
}

interface IUseFourState {
	flipPanel: boolean;
	position: number[];
	apiInformation: apiCall;
  	noDefinition?: number;
}

class UseThree extends React.Component<IUseFourProps, IUseFourState> {

	public state: IUseFourState = {
		flipPanel: true,
		position: [0, 0],
		apiInformation: {} as apiCall,
		noDefinition: 0
	};
	
	public componentDidUpdate (prevProps: IUseFourProps) {
		if(prevProps.apiInformation !== this.state.apiInformation)
			this.setState({
				position: [this.props.apiInformation.coord ? this.props.apiInformation.coord.lat : 0, this.props.apiInformation.coord ?  this.props.apiInformation.coord.lon : 0],
				apiInformation: this.props.apiInformation
			})
	}

	public onClick = (e: string) => () => {
		this.props.setMapContainer(e);
		if(document.getElementById('map') && this.props.mapContainer !== 'use4') {
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
				<div className='use4-container' onClick={this.onClick('use4')}>
					{ this.state.flipPanel ?
						<>
							{ this.props.apiInformation.main ?
								<>
									<p>Cloud Coverage: {this.props.apiInformation.clouds.all}%</p>
									<p>Description: {this.props.apiInformation.weather[0].description}</p>
								</>
								:
								<>
									<p>Cloud Coverage: </p>
									<p>Description: </p>
								</>
							}
						</>
						:
						<Map apiInformation={this.props.apiInformation} position={this.state.position} layer={'clouds_new'}/>
					}
				</div>
			</div>
		);
	}
}

export default UseThree;