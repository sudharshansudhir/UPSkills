// src/data/coursesData.js
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import lina from "../assets/lina.png";

const courses = [
  { id: 1, title: "AWS Certified Solutions Architect", image: img1, price: 80, oldPrice: 100, instructor: "Lina", instructorImg: lina },
  { id: 2, title: "Azure Fundamentals", image: img2, price: 70, oldPrice: 90, instructor: "Lina", instructorImg: lina },
  { id: 3, title: "Google Cloud Professional Architect", image: img1, price: 85, oldPrice: 110, instructor: "Lina", instructorImg: lina },
  { id: 4, title: "DevOps Masterclass", image: img2, price: 95, oldPrice: 120, instructor: "Lina", instructorImg: lina },
  { id: 5, title: "Docker & Kubernetes", image: img3, price: 75, oldPrice: 100, instructor: "Lina", instructorImg: lina },
];

export default courses;
