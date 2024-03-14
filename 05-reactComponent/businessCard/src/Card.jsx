import React from "react";

const Card = ({ name, description, socialMedia, interests }) => {
	return (
		<div className='card'>
			<h2>{name}</h2>
			<p>{description}</p>
			<div className='interests'>
				<h3>Interests:</h3>
				<ul>
					{interests.map((interest, index) => (
						<li key={index}>{interest}</li>
					))}
				</ul>
			</div>
			<div className='social-media'>
				{socialMedia.map((item, index) => (
					<a
						key={index}
						href={item.link}
						target='_blank'
						rel='noopener noreferrer'>
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
};

export default Card;
