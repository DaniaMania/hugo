
function parseGeminiResponse(response) {
    const structuredData = [];
    let currentConcern = null;
  
    // Step 1: Merge the array into one string and split into real lines
    const lines = response.join('\n').split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
    // Step 2: Process each clean line
    lines.forEach((line) => {
      if (!line.startsWith("Concern:") && !line.startsWith("Action:")) {
        return; // skip irrelevant lines
      }
  
      if (line.startsWith("Concern:")) {
        if (currentConcern) {
          structuredData.push(currentConcern);
        }
  
        const concernText = line.replace("Concern:", "").trim();
        const isCritical = concernText.toLowerCase().includes("critical");
  
        currentConcern = {
          critical: isCritical,
          concern: concernText.replace(/critical!?/i, "").trim(), // clean "CRITICAL" word
          actions: [],
        };
      } else if (line.startsWith("Action:") && currentConcern) {
        let actionText = line.replace("Action:", "").trim();
        if (currentConcern.critical) {
          actionText = actionText.replace(/critical!?/i, "").trim();
        }
        currentConcern.actions.push(actionText);
      }
    });
  
    // Push the last concern if it exists
    if (currentConcern) {
      structuredData.push(currentConcern);
    }
  
    return structuredData;
  }

export default parseGeminiResponse;