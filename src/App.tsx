import * as React from 'react';
import './App.scss';
import Banner from './landingPage/Banner/Banner';
import Footer from './landingPage/Footer/Footer';
import UseOne from './landingPage/use1/use1';
import UseTwo from './landingPage/use2/use2';
import UseThree from './landingPage/use3/use3';
import UseFour from './landingPage/use4/use4';
import UseFive from './landingPage/use5/use5';
import weatherCall from './Calls/baseWeatherCall'
import { apiCall, newsAPI } from './globalTypes/types';
import newsCall from './Calls/newsCall';

export interface ICookie {
	name: string;
	userName: string;
	city: string;
	state: string;
}

interface IAppState {
	cookie: ICookie;
	tickerInformation: string[];
	apiInformation: apiCall;
	mapContainer: string;
	tickerNews: newsAPI,
}

class App extends React.Component<{}, IAppState> {

	public state = {
		cookie: {
			name: '',
			userName: '',
			city: '',
			state: ''
		},
		tickerInformation: [],
		tickerNews: {} as newsAPI,
		apiInformation: {} as apiCall,
		mapContainer: ''
	}

	/**
	 * lifecycle
	 */
	public componentDidMount() {
		this.checkCookie();
	}

	/**
	 * setCookie 
	 * @param cvalue array of strings to insert into the cookie
	 * @param exdays number time till expiration of cookie
	 */
	public setCookie = (cvalue: string[], exdays: number) => {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		const expires = "expires="+d.toUTCString();
		let cValueJoin: string = '';
		cvalue.map((val, ind) => {
			if (ind % 2 === 0) {				
				cValueJoin += `${val}=`
			} else {
				cValueJoin += `${val}-`
			}
		})
		document.cookie = cValueJoin + ";" + expires + ";path=/";
	}
	  
	/**
	 * getCookie 
	 */
	public getCookie = () => {
		const ca = document.cookie.split(';');
		return ca;
	  }
	  
	  /**
	 * checkCookie 
	 */
	public checkCookie = async () => {
		const args: string[] = this.getCookie();
		const fArgs = args.toString().split('-');
		const cookieArgs: ICookie = {...this.state.cookie};
		fArgs.map((val) => {
			const twoDeep = val.split('=');
			twoDeep.map((value2, ind)=>{
				if (ind % 2 === 0 && value2) {
					return Object.assign(cookieArgs, {[value2]: twoDeep[ind+1]})
				}
			})
		})
		if (args) {
			// found cookie
			const makeCall = await this.callApi(cookieArgs.city, 'ci');
			const newsCall = await this.callApi(cookieArgs.state, 'co');
			console.log('newsCall: ', newsCall);
			this.setState({
				cookie: {...cookieArgs},
				tickerInformation: [cookieArgs.city, cookieArgs.state],
				tickerNews: newsCall,
				apiInformation: makeCall
			})
		}
	}

	/**
	 * onSubmit
	 * sets cookie, sets localstorage for both news and weather data 
	 */
	public onSubmit = async (event: any) => {
		event.preventDefault();

		/* Setting Form <<START>> */
		const form = event.target.form;
		let arguements = [] as any;
		Object.keys(form).map((ite: string) => {
			if(typeof form[ite].value === 'string' && form[ite].value !== '') {
				arguements.push(form[ite].name, form[ite].value);
			}
		});
		const city = form[2].value;
		const state = form[3].value;
		/* Setting Form <<END>> */

		const makeCall = await this.callApi(city, 'ci');
		const newsCall = await this.callApi(state, 'co');
		this.setCookie(arguements, 365);
		console.log(newsCall);
		
		this.setState({
			tickerInformation: [city, state],
			apiInformation: makeCall
		})
	}

	/**
	 * callApi
	 * handles all api calls 
	 * @param location location for call
	 * @param determine simple string that determines the call
	 */
	public callApi = async (location: string, determine: string) => {
		if(determine.match('ci')){return await weatherCall(location)};
		// make function that will turn countries into their country codes
		if(determine.match('co')){return await newsCall(location)};
	};

	/**
	 * setMapContainer
	 * @param mapContainer sets the which container has the map
	 */
	public setMapContainer = (mapContainer: string) => {
		if(!document.getElementById('map')) {
			this.setState({mapContainer})
		}
	}

	public render() {
		if(document.URL.match(/^https/gi)){
			alert('Please remove the \'s\' from the https in the url for the app to function normally.')
		}
		return (
			<div className="main-container">
				<>
					<div className="banner">
						<Banner cookie={this.state.cookie} onSubmit={this.onSubmit} tickerInformation={this.state.tickerInformation} apiInformation={this.state.apiInformation} tickerNews={this.state.tickerNews}/>
					</div>
				</>
				<>
					<div className="useone">
						<UseOne apiInformation={this.state.apiInformation} mapContainer={this.state.mapContainer} setMapContainer={this.setMapContainer}/>
					</div>
				</>
				<>
					<div className="usetwo">
						<UseTwo apiInformation={this.state.apiInformation} mapContainer={this.state.mapContainer} setMapContainer={this.setMapContainer}/>
					</div>
				</>
				<>
					<div className="usethree">
						<UseThree apiInformation={this.state.apiInformation} mapContainer={this.state.mapContainer} setMapContainer={this.setMapContainer}/>
					</div>
				</>
				<>
					<div className="usefour">
						<UseFour apiInformation={this.state.apiInformation} mapContainer={this.state.mapContainer} setMapContainer={this.setMapContainer}/>
					</div>
				</>
				<>
					<div className="usefive">
						<UseFive/>
					</div>
				</>
				<>
					<div className="footer">
						<Footer cookie={this.state.cookie}/>
					</div>
				</>
			</div>
		);
	}
}

export default App;