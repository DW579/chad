import React, { useState, useEffect }  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
	const [formRow, setFormRow] = useState(true);
	const [reviewRow, setReviewRow] = useState(false);
	const [object1, setObject1] = useState('');
	const [object2, setObject2] = useState('');
	const [style, setStyle] = useState({ selectedStyle: '' });
	const [formMessage, setFormMessage] = useState('');
	const [gptResponse, setGPTResponse] = useState(null);

	const { selectedStyle } = style;



	// useEffect(() => {
	// 	if(formMessage !== '') {
	// 		fetch('/post_chatgpt', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ message: "formMessage" })
	// 		})
	// 			.then((res) => res.json())
	// 			.then((data) => console.log(data))
	// 	}
	// })

	// useEffect(() => {
	// 	if (formMessage !== '') {
	// 		postFormMessage();
	// 	}
	// });

	// const submitForm = (event) => {
	// 	event.preventDefault();

	// 	// setFormMessage("You are a designer that is creative, ability to simplify complex ideas, and have an artistic talent. You have been tasked by a client to create a simple 12 word prompt to generate a high resolution image with DALL·E 2 for a computer desktop. The image features an " + object1 + " and " + object2 + ". Include the exact phrase, " + style.selectedStyle + " style. Do not include the phrase DALL·E 2, verbs, and adjectives in the prompt. Return only the prompt.")

	// 	postFormMessage();

	// 	setFormRow(!formRow);
	// 	setReviewRow(!reviewRow);
	// };

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

	// const postFormMessage = async () => {
	// 	try {
	// 		const response = await fetch('/post_chatgpt', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({messge: formMessage})
	// 		});

	// 		const data = await response.json();

	// 		setGPTResponse(data);

	// 	} catch(error) {
	// 		console.log(error);
	// 	}
	// }


// const [data, setData] = React.useState(null);

// React.useEffect(() => {
//   fetch("/api")
//     .then((res) => res.json())
//     .then((data) => setData(data.message));
// }, []);

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
					<Col></Col>
					<Col>
						<Form onSubmit={submitForm}>
							<Form.Group className="mb-3" controlId="formObject1">
								<Form.Label>What is the main object?</Form.Label>
								<Form.Control
									type="text"
									placeholder="i.e. dog, cat, mouse, owl, etc."
									onChange={handleObject1Change}
									value={object1}
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formObject2">
								<Form.Label>What is the secondary object?</Form.Label>
								<Form.Control
									type="text"
									placeholder="i.e. table, mountain, forest, etc."
									onChange={handleObject2Change}
									value={object2}
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formStyle">
								<Form.Label>Pick the style</Form.Label>
								<Form.Check 
									value="minimalist"
									type="radio" 
									aria-label="radio 1"
									label="Minimalist" 
									onChange={handleStyleChange}
									checked={selectedStyle === "minimalist"}
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
								Submit
							</Button>
						</Form>
					</Col>
					<Col></Col>
				</Row>
			)}
			{reviewRow && (
				<Row>
					<Col></Col>
					<Col xs={7} className="text-center">
						<h2>Original message formated to be sent to Chat GPT</h2>
						<p>{gptResponse.form_message}</p>
						<h2>Chat GPT response to be sent to DALL·E 2</h2>
						<p>{gptResponse.gpt_response}</p>
					</Col>
					<Col></Col>
				</Row>
			)}
		</Container>
	);
}

export default App;