import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {name: '', email: '', statusCode: 0, adminStatus: false};
	};
	
	componentDidMount() {
		console.log("success");
	}
	
	addStudent = (student) => {
		const token = Cookies.get('XSRF-TOKEN');
		this.handleSubmit(student);
		//console.log("entered addStudent");
		
		fetch(`${SERVER_URL}/student`, 

			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json',
							'X-XSRF-TOKEN': token },
				body: student
			})
		.then(res => {
			if (res.ok) {
				toast.success("Student successfully added", {
					position: toast.POSITION.BOTTOM_LEFT
				});
			} else {
				toast.error("Error when adding student", {
					position: toast.POSITION.BOTTOM_LEFT
				});
				console.error('Post http status =' + res.status);
			}})
		.catch(err => {
			toast.error("Error when adding student", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			console.error(err);
		})
		
	}
	
	handleSubmit = (student) => {
		//console.log("entered handle submit");
		student.preventDefault();
	}
	
	render() {
		//console.log("entered render");
		return(
			<div>
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography variant="h6" color="inherit">
							{ 'Add a New Student' }
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="App">
					<form onSubmit={this.addStudent}>
						<br/><br/><br/>
						<label> Enter the student's name:{" "}
							<input id="sName" type="text" name='name' onChange={ student => this.setState({name: student.target.value})} />
							<br/>
						</label>
						<br/><br/>
						<label> Enter the student's email:{" "}
							<input id="sEmail" type="text" name='email' onChange={ student => this.setState({email: student.target.value})} />
						</label>
						<br/><br/>
						<p> Student's status code: </p>
						{JSON.stringify(this.state.statusCode)}
						<br/><br/><br/>
						<button id="submitNewStudent" type = "submit"> Add Student </button>
					</form>
					<ToastContainer autoClose={1500} />
				</div>
			</div>
		);
	}
}


export default Student;

