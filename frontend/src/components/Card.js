import React from "react";
import "../Css/CategoryCard.css";

function CourseCard({ image, title, instructor = {}, progress, lesson }) {
  return (
    <div className="courseCardCoureseCrourseCD">
      <img
        src={image}
        alt={title}
        className="courseImageCCCrourseCD"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          display: "block",
          margin: "0 auto"
        }}
      />
      <h3 className="courseTitleCCCrourseCD">{title}</h3>
      {instructor.name && (
        <div className="instructorCCCrourseCD">
          
          <span className="instructorNameCCCrourseCD">{instructor.name}</span>
        </div>
      )}
      <div className="progressBarCCCrourseCD">
        <div className="progressFillCCCrourseCD" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="lessonCountCCCrourseCD">{lesson}</span>
    </div>
  );
}

export default CourseCard;
