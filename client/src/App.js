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
	const [object1, setObject1] = useState('');
	const [object2, setObject2] = useState('');
	const [style, setStyle] = useState({ selectedStyle: "", another: "another" });

	const { selectedStyle } = style;

	const submitForm = (event) => {
		event.preventDefault();

		console.log(`Object 1: ${object1}`)
		console.log(`Object 2: ${object2}`)
		console.log(`Style: ${selectedStyle}`)
		setFormRow(!formRow);

	};

	const handleObject1Change = (event) => {
		setObject1(event.target.value);
	}

	const handleObject2Change = (event) => {
		setObject2(event.target.value);
	}

	const handleStyleChange = (event) => {
		event.persist();
		console.log(event.target.value);

		setStyle(prevState => ({
			...prevState,
			selectedStyle: event.target.value
		}))
	}
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
							<Form.Group className="mb-3" controlId="formSubject">
								<Form.Label>What is the main object?</Form.Label>
								<Form.Control
									type="text"
									placeholder="i.e. dog, cat, mouse, owl, etc."
									onChange={handleObject1Change}
									value={object1}
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formDescription1">
								<Form.Label>What is the secondary object?</Form.Label>
								<Form.Control
									type="text"
									placeholder="i.e. table, mountain, forest, etc."
									onChange={handleObject2Change}
									value={object2}
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicCheckbox">
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

		</Container>
	);
}

export default App;