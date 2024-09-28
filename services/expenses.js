const api_url = "https://fintrack-api-gmpu.onrender.com/api/v1/expenses/";

const insertExpense = async (newExpense) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export { insertExpense };
