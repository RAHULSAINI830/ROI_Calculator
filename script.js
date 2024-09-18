// Function to update slider background based on the slider's value
function updateSliderBackground(slider) {
    const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--value', percentage + '%');
}

// Function to update the slider's value and background color
function updateValue(slider, outputId) {
    const value = slider.value;
    document.getElementById(outputId).value = value;
    updateSliderBackground(slider);
    calculateROI(); // Call calculateROI whenever a value changes
}

// Function to increment slider value
function incrementValue(id) {
    const slider = document.getElementById(id);
    if (slider.value < slider.max) {
        slider.value++;
        updateValue(slider, id + 'Value');
    }
}

// Function to decrement slider value
function decrementValue(id) {
    const slider = document.getElementById(id);
    if (slider.value > slider.min) {
        slider.value--;
        updateValue(slider, id + 'Value');
    }
}

// Function to calculate ROI using the provided formula
function calculateROI() {
    // Get the input values
    const employees = parseInt(document.getElementById('employees').value);
    const leads = parseInt(document.getElementById('leads').value);
    const jobs = parseInt(document.getElementById('jobs').value);
    const pricePerJob = parseFloat(document.getElementById('pricePerJob').value);
    const advertisingSpend = parseFloat(document.getElementById('advertisingSpend').value);

    // Assumptions based on your example
    const totalRevenueFromJobs = jobs * pricePerJob;
    const totalCostOfInspections = advertisingSpend * leads; // assuming advertising spend is inspection cost
    const estimatesConversionRate = 0.3; // 30% as per your example
    const timeBetweenInspectionAndEstimate = 10; // days
    const averageDealSize = 5000; // as per your example

    // ROI Calculation as per provided formula
    const roi = (totalRevenueFromJobs / totalCostOfInspections) *
                (estimatesConversionRate / 
                (1 - (timeBetweenInspectionAndEstimate / averageDealSize))) * 100;

    // Update the results in the UI
    document.getElementById('roiPercentage').innerText = roi.toFixed(1) + '%';
    document.getElementById('workizCost').innerText = '$' + totalCostOfInspections.toFixed(2) + '/day';
    document.getElementById('workizReturn').innerText = '$' + totalRevenueFromJobs.toFixed(2) + '/day';
    document.getElementById('revenueBefore').innerText = '$' + (totalRevenueFromJobs - advertisingSpend).toFixed(2) + '/day';
    document.getElementById('increasedLeads').innerText = '$' + (totalRevenueFromJobs * estimatesConversionRate).toFixed(2) + '/day';
    document.getElementById('revenueAfter').innerText = '$' + totalRevenueFromJobs.toFixed(2) + '/day';
}

// Initialize slider backgrounds on load
document.querySelectorAll('input[type="range"]').forEach(slider => {
    updateSliderBackground(slider);
});

// Add event listeners to calculate ROI on value change
document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', calculateROI);
});

document.getElementById('pricePerJob').addEventListener('input', calculateROI);
document.getElementById('advertisingSpend').addEventListener('input', calculateROI);

document.getElementById('calculateNowButton').addEventListener('click', function() {
    const initialView = document.getElementById('initialView');
    const resultsView = document.getElementById('resultsView');
    
    // Hide initial view
    initialView.style.opacity = '0';
    initialView.style.visibility = 'hidden';
    
    // Show results view with animation
    setTimeout(() => {
        resultsView.style.opacity = '1';
        resultsView.style.top = '0';
        resultsView.style.visibility = 'visible';
    }, 500); // Ensure there's a delay for smooth transition
});

// Initial calculation
calculateROI();
