import React, { useState, useEffect }  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
	const [formRow, setFormRow] = useState(true);
	const [reviewRow, setReviewRow] = useState(false);
	const [finalProductRow, setFinalProductRow] = useState(false);
	const [object1, setObject1] = useState('');
	const [object2, setObject2] = useState('');
	const [style, setStyle] = useState({ selectedStyle: '' });
	const [gptResponse, setGPTResponse] = useState(null);
	const [dalleResponse, setDalleResponse] = useState(null);
	
	const { selectedStyle } = style;

	const submitForm = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('/post_chatgpt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({object1: object1, object2: object2, style: style.selectedStyle})
			});

			const data = await response.json();

			setGPTResponse(data);

		} catch(error) {
			console.log(error);
		}

		setFormRow(!formRow);
		setReviewRow(!reviewRow);
	};

	const handleObject1Change = (event) => {
		setObject1(event.target.value);
	}

	const handleObject2Change = (event) => {
		setObject2(event.target.value);
	}

	const handleStyleChange = (event) => {
		event.persist();

		setStyle(prevState => ({
			...prevState,
			selectedStyle: event.target.value
		}))
	}

	const backToForm = () => {
		setReviewRow(!reviewRow);
		setFormRow(!formRow);
	}

	const submitGPTResponse = async () => {
		try {
			const response = await fetch('/post_dalle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({gptResponse: gptResponse.gpt_response})
			});

			const data = await response.json();

			setDalleResponse(data);

		} catch(error) {
			console.log(error);
		}

		setReviewRow(!reviewRow);
		setFinalProductRow(!finalProductRow);
	}

	return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>{!data ? "Loading..." : data}</p>
//   </header>
// </div>
		<Container fluid>
			<Row>
				<Navbar bg="dark" variant="dark">
					<Container>
						<Navbar.Brand href="/">
							Chad
						</Navbar.Brand>
					</Container>
				</Navbar>
			</Row>
			{formRow && (
				<Row>
					<Col>
						<Row className="padding-top">
							<Col></Col>
							<Col xs={7} className="text-center">
								<h1>Welcome to Chad!</h1>
								<h3>Your Chat GPT Prompt Engineer.</h3>
							</Col>
							<Col></Col>
						</Row>
						<Row className="padding-top">
							<Col></Col>
							<Col>
								<Form onSubmit={submitForm}>
									<Form.Group className="mb-3" controlId="formObject1">
										<Form.Label className="bold">What is the main object?</Form.Label>
										<Form.Control
											type="text"
											placeholder="i.e. dog, cat, mouse, owl, etc."
											onChange={handleObject1Change}
											value={object1}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formObject2">
										<Form.Label className="bold">What is the secondary object?</Form.Label>
										<Form.Control
											type="text"
											placeholder="i.e. table, mountain, forest, etc."
											onChange={handleObject2Change}
											value={object2}
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="formStyle">
										<Form.Label className="bold">Pick the style</Form.Label>
										<Form.Check 
											value="impressionists"
											type="radio" 
											aria-label="radio 1"
											label="Impressionists" 
											onChange={handleStyleChange}
											checked={selectedStyle === "impressionists"}
										/>
										<Form.Check 
											value="flat graphic"
											type="radio" 
											aria-label="radio 2"
											label="Flat Graphic" 
											onChange={handleStyleChange}
											checked={selectedStyle === "flat graphic"}
										/>
										<Form.Check 
											value="scandinavian"
											type="radio" 
											aria-label="radio 3"
											label="Scandinavian" 
											onChange={handleStyleChange}
											checked={selectedStyle === "scandinavian"}
										/>
										<Form.Check 
											value="35mm"
											type="radio" 
											aria-label="radio 4"
											label="35mm" 
											onChange={handleStyleChange}
											checked={selectedStyle === "35mm"}
										/>
										<Form.Check 
											value="retro graphic"
											type="radio" 
											aria-label="radio 5"
											label="Retro Graphic" 
											onChange={handleStyleChange}
											checked={selectedStyle === "retro graphic"}
										/>
									</Form.Group>

									<Button variant="primary" type="submit" onClick={() => submitForm}>
										Send to Chat GPT
									</Button>
								</Form>
							</Col>
							<Col></Col>
						</Row>
					</Col>
					
				</Row>
			)}
			{reviewRow && (
				<Row className="padding-top">
					<Col></Col>
					<Col xs={7} className="text-center">
						<h1>Review</h1>
						<h3>Original message formated to be sent to Chat GPT</h3>
						<p>{gptResponse.form_message}</p>
						<h3>Chat GPT response to be sent to DALL·E 2</h3>
						<p>{gptResponse.gpt_response}</p>
						<Row>
							<Col>
								<Button variant="danger" onClick={backToForm}>Back</Button>
							</Col>
							<Col>
								<Button variant="success" onClick={submitGPTResponse}>Submit to DALL·E 2</Button>
							</Col>
						</Row>
					</Col>
					<Col></Col>
				</Row>
			)}
			{finalProductRow && (
				<Row className="padding-top">
					<Col></Col>
					<Col xs={4} className="text-center">
						<h1>Final Product from DALL·E</h1>
						<img src={dalleResponse.url} width="100%" className="padding-top" />
						<h2 className="padding-top">Prompt used:</h2>
						<p>{gptResponse.gpt_response}</p>
					</Col>
					<Col></Col>
				</Row>
			)}
		</Container>
	);
}

export default App;