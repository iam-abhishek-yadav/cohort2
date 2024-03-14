import React, { useState, useRef } from "react";

const CardForm = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		socialMedia: [],
		interests: [],
	});

	const interestInputRefs = useRef([]);
	const socialMediaInputRefs = useRef([]);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleAddSocialMedia = () => {
		setFormData({
			...formData,
			socialMedia: [...formData.socialMedia, { name: "", link: "" }],
		});
		socialMediaInputRefs.current[
			socialMediaInputRefs.current.length - 1
		]?.focus();
	};

	const handleSocialMediaChange = (index, e) => {
		const updatedSocialMedia = [...formData.socialMedia];
		updatedSocialMedia[index][e.target.name] = e.target.value;
		setFormData({
			...formData,
			socialMedia: updatedSocialMedia,
		});
	};

	const handleAddInterest = () => {
		setFormData({
			...formData,
			interests: [...formData.interests, ""],
		});
		interestInputRefs.current[interestInputRefs.current.length - 1]?.focus();
	};

	const handleInterestChange = (index, e) => {
		const updatedInterests = [...formData.interests];
		updatedInterests[index] = e.target.value;
		setFormData({
			...formData,
			interests: updatedInterests,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		setFormData({
			name: "",
			description: "",
			socialMedia: [],
			interests: [],
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				name='name'
				placeholder='Name'
				value={formData.name}
				onChange={handleInputChange}
			/>
			<input
				type='text'
				name='description'
				placeholder='Description'
				value={formData.description}
				onChange={handleInputChange}
			/>
			{formData.socialMedia.map((item, index) => (
				<div key={index}>
					<input
						type='text'
						name='name'
						placeholder='Social Media Name'
						value={item.name}
						onChange={(e) => handleSocialMediaChange(index, e)}
						ref={(el) => (socialMediaInputRefs.current[index] = el)}
					/>
					<input
						type='text'
						name='link'
						placeholder='Link'
						value={item.link}
						onChange={(e) => handleSocialMediaChange(index, e)}
					/>
				</div>
			))}
			<button
				type='button'
				onClick={handleAddSocialMedia}>
				Add Social Media
			</button>
			{formData.interests.map((interest, index) => (
				<div key={index}>
					<input
						type='text'
						placeholder='Interest'
						value={interest}
						onChange={(e) => handleInterestChange(index, e)}
						ref={(el) => (interestInputRefs.current[index] = el)}
					/>
				</div>
			))}
			<button
				type='button'
				onClick={handleAddInterest}>
				Add Interest
			</button>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default CardForm;
