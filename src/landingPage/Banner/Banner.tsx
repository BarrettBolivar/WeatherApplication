import * as React from 'react';
import { apiCall, newsAPI } from '../../globalTypes/types';

interface IBannerProps {
	cookie: {
		name: string;
		userName: string;
		city: string;
		state: string;
	};
	onSubmit: (event: any) => void;
	tickerInformation: string[];
	apiInformation: apiCall;
	tickerNews: newsAPI;
}

interface IBannerState {
	sideBar: string;
	apiInformation?: JSON;
	city: string;
	name: string;
	state: string;
	userName: string;
	val: changeEvent;
	formGiven: boolean;
	mainWeatherIcon: string;
	mainWeatherIconDayNight: string;
	generalWeather: string;
	tickerNewsFiltered: string[]
}

interface changeEvent {
	target: {
		name: string;
		value: string;
	}
}

class Banner extends React.Component<IBannerProps, IBannerState> {
	
	public state: IBannerState = {
		sideBar: 'bannerInner close',
		apiInformation: JSON,
		city: '',
		name: '',
		state: '',
		userName: '',
		val: {target:{ name:'', value: ''}},
		formGiven: false,
		mainWeatherIcon: 'default',
		mainWeatherIconDayNight: 'day',
		generalWeather: 'General Weather',
		tickerNewsFiltered: []
	};

	/**
	 * lifecycle
	 */
	public componentDidUpdate(prevProps: IBannerProps) {
		if (prevProps.cookie.city !== this.props.cookie.city || prevProps.apiInformation !== this.props.apiInformation || prevProps.tickerNews !== this.props.tickerNews) {
			this.determineWeather();
			this.setTickerNews();
			this.setState({formGiven: true});
		}
	}

	/**
	 * onClickOpen
	 */
	public onClickOpen = () => {
		this.setState({
			sideBar: 'bannerInner open'
		})
	}

	/**
	 * onClickClose
	 */
	public onClickClose = () => {
		this.setState({
			sideBar: 'bannerInner close'
		})
	}

	/**
	 * determineWeather
	 */
	public determineWeather = () => {
		let generalWeather = 'Normal Day';
		if(this.props.apiInformation.weather) {
			generalWeather = this.props.apiInformation.weather[0].description;
		}
		var hr = (new Date()).getHours(); //get hours of the day in 24Hr format (0-23)
		const mainWeatherIconDayNight = (hr >= 7 && hr <= 18) ? 'day' : 'night';
		// what options I'm guessing that they could be
		const regexArr = [/cloud/gim, /thunder/gim, /lightning/gim, /snow/gim, /rain/gim];
		regexArr.map((regex) => {
			if(generalWeather.search(regex) >= 0) {
				const mainWeatherIcon = regex.toString().split('/')[1];
				this.setState({
					mainWeatherIcon,
					mainWeatherIconDayNight,
					generalWeather
				});
			}; 
		});
	}

	/**
	 * setTickerNews
	 */
	public setTickerNews = () => {
		const tickerN = [] as string[];
		const articles = this.props.tickerNews.articles || undefined;
		if(articles) {
			Object.keys(articles).map((val, ind)=>{
				tickerN.push(articles[ind].description);
			});
			this.setState({tickerNewsFiltered: tickerN})
		};
	}

	/**
	 * onSubmit
	 * @param event IChangeEvent that gives all form data from which ever component gives
	 */
	public onSubmit = (event: any) => {
		event.preventDefault();
		this.onClickClose();
		this.props.onSubmit(event);
		this.setState({formGiven: true});
	}

	/**
	 * change
	 * @param val the values in the form
	 */
	public change = (val: changeEvent) => {
		this.setState({
			...this.state,
			[val.target.name]: val.target.value
		});
	}

	/**
	 * clearCookie
	 */
	public clearCookie = () => {
		document.cookie = `name=-userName=-city=-state=-; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
		this.setState({formGiven: false});
	}

	public render() {
		return (
			<div className='banner'>
				<div className="ticker-wrap">
					<div className="ticker">
						{
							this.props.tickerInformation[0] &&
								<div className="ticker__item" key='tickerName'>Today for {this.props.tickerInformation.join(' ')} </div>
							
						}
						{
							this.state.tickerNewsFiltered.map((val, ind) => {
								return (
									<React.Fragment key={`frag-${ind}`}>
										<div className="ticker__item" key='attribution'>Powered by News API</div>
										<div className="ticker__item" key={ind}>{val}</div>
									</React.Fragment>
								);
							})
						}
					</div>
				</div>
				{
					!this.state.formGiven ? 
						<>
							{ this.state.sideBar === 'bannerInner close' ?
								<button onClick={this.onClickOpen} className='banner-button'>☰</button>
								:
								<button onClick={this.onClickClose} className='banner-button'>X</button>
							}
							<div className={this.state.sideBar}>
								<form>
									Name: <input name='name' value={this.state.name} onChange={(val) => this.change(val)}/>
									User Name: <input name='userName' value={this.state.userName} onChange={(val) => this.change(val)}/>
									City: <input name='city' value={this.state.city} onChange={(val) => this.change(val)}/>
									Country: <input name='state' value={this.state.state} onChange={(val) => this.change(val)}/>
									<button className='submitButton' onClick={(event) => this.onSubmit(event)}>Submit</button>
								</form>
							</div>
						</>
					:
					<button id='deleteCookie' onClick={() => this.clearCookie()}>Clear Your Information</button>
				}
				{ this.state.mainWeatherIcon && 
					<div className={`${this.state.mainWeatherIcon}-${this.state.mainWeatherIconDayNight} static-general-weather`}>
						<p>{this.state.generalWeather}</p>
					</div>
				}
			</div>
		);
	}
}

export default Banner;