import React from "react";
import TagCard from "./TagCard";
import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { MdPersonalInjury } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";
import { GiPayMoney } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";

function TagBasedExpense({
    housing,
    housingComparison,
    transportation,
    transportationComparison,
    food,
    foodComparison,
    healthCare,
    healthCareComparison,
    personalCare,
    personalCareComparison,
    debtComparison,
    debt,
    entertainmentComparison,
    entertainment,
    lendComparison,
    lend,
    miscellaneousComparison,
    miscellaneous,
}) {
    return (
        <div className="tag-based-expensne dashboard-second-container dashboard-border-radius">
            <TagCard
                tag={"Housing"}
                tagAmount={housing}
                tagStatus={housingComparison}
                icon={IoHomeSharp}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Transportation"}
                tagAmount={transportation}
                tagStatus={transportationComparison}
                icon={MdOutlineEmojiTransportation}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Food"}
                tagAmount={food}
                tagStatus={foodComparison}
                icon={MdFoodBank}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Health Care"}
                tagAmount={healthCare}
                tagStatus={healthCareComparison}
                icon={MdHealthAndSafety}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Personal Care"}
                tagAmount={personalCare}
                tagStatus={personalCareComparison}
                icon={MdPersonalInjury}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Debt"}
                tagAmount={debt}
                tagStatus={debtComparison}
                icon={GiReceiveMoney}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Entertainment"}
                tagAmount={entertainment}
                tagStatus={entertainmentComparison}
                icon={PiTelevisionFill}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Lend"}
                tagAmount={lend}
                tagStatus={lendComparison}
                icon={GiPayMoney}
                className="tag-based-expense-sub-div"
            />
            <TagCard
                tag={"Miscellaneous"}
                tagAmount={miscellaneous}
                tagStatus={miscellaneousComparison}
                icon={MdMiscellaneousServices}
                className="tag-based-expense-sub-div"
            />
        </div>
    );
}

export default TagBasedExpense;
