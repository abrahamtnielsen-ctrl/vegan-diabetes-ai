const WEBHOOK_URL = "https://n8n.srv1472583.hstgr.cloud/webhook/meal-upload";

const tests = [
  {
    input: "oatmeal with blueberries and chia seeds",
    expected: { is_vegan: true, blocked: false }
  },
  {
    input: "pepperoni pizza with soda",
    expected: { is_vegan: false, blocked: true }
  },
  {
    input: "2 eggs with oatmeal",
    expected: { is_vegan: false, blocked: true }
  },
  {
    input: "food",
    expected: { error: "vague" }
  },
  {
    input: "buddha bowl with maple syrup and sriracha",
    expected: { sugar_detected: true, blocked: false, is_vegan: true }
  }
];

async function runTests() {
  let passed = 0;

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    let testPassed = true;

    console.log(`\nRunning test ${i + 1}: ${test.input}`);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          meal_text: test.input
        })
      });

      const data = await res.json();
      console.log("Response:", data);

      if (test.expected.blocked !== undefined) {
        const isBlocked = data.analysis_status === "blocked";
        const ok = isBlocked === test.expected.blocked;
        console.log("Blocked check:", ok ? "PASS" : "FAIL");
        if (!ok) testPassed = false;
      }

      if (test.expected.is_vegan !== undefined) {
        const ok = data.is_vegan === test.expected.is_vegan;
        console.log("Vegan check:", ok ? "PASS" : "FAIL");
        if (!ok) testPassed = false;
      }

      if (test.expected.sugar_detected) {
        const ok = Array.isArray(data.sugar_sources) && data.sugar_sources.length > 0;
        console.log("Sugar check:", ok ? "PASS" : "FAIL");
        if (!ok) testPassed = false;
      }

      if (test.expected.error === "vague") {
        const ok =
          data.ok === false ||
          data.code === "INVALID_MEAL_INPUT" ||
          data.code === "INPUT_TOO_VAGUE" ||
          typeof data.error === "string";
        console.log("Vague check:", ok ? "PASS" : "FAIL");
        if (!ok) testPassed = false;
      }

      console.log("Test result:", testPassed ? "PASS" : "FAIL");
      if (testPassed) passed++;
    } catch (err) {
      console.error("Test result: FAIL");
      console.error("Error:", err.message);
    }
  }

  console.log(`\nFinal score: ${passed}/${tests.length} tests passed`);
}

runTests();