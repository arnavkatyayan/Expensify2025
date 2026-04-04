import { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const [budget, setBudget] = useState(0);

    const updateBudget = (newBudget) => {
        setBudget(newBudget);
    };

    return (
        <BudgetContext.Provider
            value={{ budget, setBudget, updateBudget }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => useContext(BudgetContext);