
function parseGeminiResponse(response) {
    const structuredData = [];
    let currentConcern = null;
  
    const lines = response.join('\n').split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
    lines.forEach((line) => {
      if (!line.startsWith("Concern:") && !line.startsWith("Action:")) {
        return;
      }
  
      if (line.startsWith("Concern:")) {
        if (currentConcern) {
          structuredData.push(currentConcern);
        }
  
        const concernText = line.replace("Concern:", "").trim();
        const isCritical = concernText.toLowerCase().includes("critical");
  
        currentConcern = {
          critical: isCritical,
          concern: concernText.replace(/critical!?/i, "").trim(),
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
  
    if (currentConcern) {
      structuredData.push(currentConcern);
    }
  
    return structuredData;
  }

export default parseGeminiResponse;