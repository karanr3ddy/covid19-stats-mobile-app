import React, { Component } from 'react'
import COVID19 from '../models/COVID19'
import { ResponsiveContainer, PieChart, Pie, Area, AreaChart ,CartesianGrid, YAxis, XAxis, Tooltip,Cell } from 'recharts';
import moment from 'moment';
import CountUp from 'react-countup';

export default class HomeScreen extends Component {

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <LatestData />
                <CountryWiseData />
            </div>
        )
    }
}


class LatestData extends Component {
    state = { data: null, setDataState: null };
    componentDidMount() {
        COVID19.getLatest().then((data) => {
            console.log("api data", data);
            this.setState({ data });
        }).catch(err => {
            console.error(err);
        });
    }
    
    render() {
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


        const { data } = this.state;
        let chartData = [];
        for (let key in data) {
            chartData.push({ name: key, value: data[key] })
        }
        console.log("chart data", chartData);
        return (
            <div>
                <h3>Latest Data</h3>
                <div>
                    <ul style={{ listStyleType: 'none' }}>
                        <li>Confirmed : {data ? <CountUp start={data.confirmed-100}  duration={5} end={data.confirmed} /> : "loading"}</li>
                        <li>Deaths : {data ?<CountUp start={data.deaths-100}  duration={5} end={data.deaths} /> : "loading"}</li>
                        <li>Recovered : {data ? <CountUp start={data.recovered-100}  duration={5} end={data.recovered} /> : "loading"}</li>
                    </ul>
                </div>
                <ResponsiveContainer height={300}>
                    <PieChart >
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} >
            {
                        chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)
          }
                            </Pie>

                    </PieChart>
                </ResponsiveContainer>

            </div>
        )
    }
}
class CountryWiseData extends Component {
    state = { data: null, setDataState: null };
    componentDidMount() {
        COVID19.getByCountry('IND').then((data) => {
            console.log("country data", data);
            this.setState({ data });
        }).catch(err => {
            console.error(err);
        });
    }
    render() {
        const { data } = this.state;
        let chartData = [];
        let today = moment()
        let dateExp = new RegExp(`2020-${today.format('MM')}`,'gm');
        for (let key in data) {
            if(dateExp.test(key))
            chartData.push({ name: key, ...data[key] });
        }
        return (
            <div>
                <h3>Country Data</h3>
        <h4>Showing data for {today.format('MMM')} Month</h4>
                <ResponsiveContainer height={250}>
                    <AreaChart width={730} height={250} data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="confirmed" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="deaths" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        <Area type="monotone" dataKey="recovered" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                    {/* <LineChart width={730} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
                    <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="recovered" stroke="#82ddff" />
                </LineChart> */}
                </ResponsiveContainer>


            </div>
        )
    }
}
