import * as React from 'react';
import { apiCall } from '../../globalTypes/types';
import Map from '../Map/Map'

interface IUseOneProps {
	apiInformation: apiCall;
	mapContainer: string;
	setMapContainer: (mapContainer: string) => void;
}

interface IUseOneState {
	flipPanel: boolean;
	position: number[];
	apiInformation: apiCall;
  	noDefinition?: number;
}

class UseOne extends React.Component<IUseOneProps, IUseOneState> {

  public state: IUseOneState = {
	flipPanel: true,
	position: [0, 0],
	apiInformation: {} as apiCall,
    noDefinition: 0
  };
  
  public componentDidUpdate (prevProps: IUseOneProps) {
	if(prevProps.apiInformation !== this.state.apiInformation)
	  this.setState({
		  position: [this.props.apiInformation.coord ? this.props.apiInformation.coord.lat : 0, this.props.apiInformation.coord ?  this.props.apiInformation.coord.lon : 0],
		  apiInformation: this.props.apiInformation
	  })
	}

  	public onClick = (e: string) => () => {
		this.props.setMapContainer(e);
		if(document.getElementById('map') && this.props.mapContainer !== 'use1') {
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
        <div className='use1-container' onClick={this.onClick('use1')}>
			{ this.state.flipPanel ?
				<>
					{ this.props.apiInformation.wind ?
						<>
							<p>Wind degree: {this.props.apiInformation.wind.deg}°</p>
							<p>Wind speed: {this.props.apiInformation.wind.speed}</p>
						</>
						:
						<>
							<p>Wind degree: </p>
							<p>Wind speed: </p>
						</>
					}
				</>
				:
				<Map apiInformation={this.props.apiInformation} position={this.state.position} layer={'wind_new'}/>
			}
			
        </div>
      </div>
    );
  }
}

export default UseOne;