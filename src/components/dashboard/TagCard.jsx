import React from "react";
import { GrDescend, GrAscend } from "react-icons/gr";

function TagCard({ tag, tagAmount, tagStatus, icon }) {
    const IconComponent = icon;
    const ArrowComponent = tagStatus === "GrDescend" ? GrAscend : GrDescend;

    return (
        <div className="tag-based-expense-sub-div">
            <div className="tag-based-heading-div">
                <IconComponent className="tag-based-icon" />{" "}
                {/* Render the icon component */}
                <div className="tag-based-heading">{tag}</div>
            </div>
            <div className="tag-based-expense-amount">{tagAmount}</div>
            <div className="about-month">
                <div>This month</div>
                <ArrowComponent
                    className={
                        tagStatus === "GrDescend"
                            ? "descending-arrow"
                            : "ascending-arrow"
                    }
                />
            </div>
        </div>
    );
}

export default TagCard;
