import React from 'react';
import './About.css';
import aboutImage from './Assets/logo1.avif';
import teamImage from './Assets/OurTeam.jpg'; // Add your image path here
import testimonialImage from './Assets/test.png'; // Add your image path here

function About() {
  return (
    <div className="about">
      <h2>About Us</h2>
      <div className="about-content">
        <img src={aboutImage} alt="About Us" />
        <p>Welcome to the Toy Store! We are dedicated to providing the best toys for kids of all ages. Our mission is to bring joy and learning through our carefully curated selection of toys. Whether you're looking for educational toys, fun games, or creative playthings, we have something for everyone. Thank you for visiting us!</p>
        <h3>Our Values:</h3>
        <ul>
          <li>Quality and Safety: Ensuring the highest standards for every toy we offer.</li>
          <li>Customer Satisfaction: Providing exceptional service and support.</li>
          <li>Innovation: Continuously curating new and exciting products.</li>
        </ul>
        <h3>Meet Our Team</h3>
        <div className="team-section">
          <img src={teamImage} alt="Our Team" />
          <p>Our team is passionate about toys and dedicated to making sure you find exactly what you're looking for. From our customer service representatives to our product curators, we are here to help you every step of the way.</p>
        </div>
        <h3>What Our Customers Say</h3>
        <div className="testimonials-section">
          <img src={testimonialImage} alt="Customer Testimonials" />
          <p>“The Toy Store has been amazing for my kids. They always find the coolest toys and the customer service is top-notch. Highly recommend!” – Sarah M.</p>
          <p>“A fantastic place to shop for educational toys. My children love the variety and quality of the products. The team is always helpful and friendly.” – John D.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
