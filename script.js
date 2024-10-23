document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;
    const totalQuestions = 5;
    const answers = [];
    
    // Get all option buttons
    const options = document.querySelectorAll('.option');
    
    // Add click event to all options
    options.forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });
    
    // Get restart button
    const restartBtn = document.querySelector('.restart-btn');
    restartBtn.addEventListener('click', restartQuiz);
    
    function handleOptionClick(e) {
        // Remove selected class from other options in the same question
        const currentOptions = e.target.closest('.question').querySelectorAll('.option');
        currentOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        e.target.classList.add('selected');
        
        // Store the answer
        answers[currentQuestion - 1] = e.target.textContent;
        
        // Wait a brief moment before moving to next question
        setTimeout(() => {
            if (currentQuestion < totalQuestions) {
                // Move to next question
                moveToQuestion(currentQuestion + 1);
            } else {
                // Show result
                showResult();
            }
        }, 300);
    }
    
    function moveToQuestion(questionNumber) {
        // Update current question
        currentQuestion = questionNumber;
        
        // Update progress bar
        const progress = document.querySelector('.progress');
        progress.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
        
        // Hide all questions
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('active');
        });
        
        // Show current question
        document.querySelector(`[data-question="${questionNumber}"]`).classList.add('active');
    }
    
    function showResult() {
        // Hide all questions
        document.querySelectorAll('.question').forEach(q => {
            q.style.display = 'none';
        });
        
        // Hide progress bar
        document.querySelector('.progress-bar').style.display = 'none';
        
        // Calculate result based on answers
        const result = calculateResult(answers);
        
        // Show result
        const resultDiv = document.querySelector('.result');
        const positionResult = resultDiv.querySelector('.position-result');
        positionResult.textContent = result;
        resultDiv.style.display = 'block';
    }
    
    function calculateResult(answers) {
        // Simple scoring system - count the most frequent answer pattern
        const patterns = {
            stroke: 0,    // Leadership and pace setting
            engine: 0,    // Power and consistency
            technical: 0, // Technique and precision
            cox: 0        // Communication and strategy
        };
        
        // Analyze each answer
        answers.forEach((answer, index) => {
            if (answer.includes('pace') || answer.includes('rhythm') || answer.includes('leadership')) {
                patterns.stroke++;
            } else if (answer.includes('power') || answer.includes('consistency')) {
                patterns.engine++;
            } else if (answer.includes('technique') || answer.includes('precision') || answer.includes('adapt')) {
                patterns.technical++;
            } else if (answer.includes('coaching') || answer.includes('communication') || answer.includes('strategic')) {
                patterns.cox++;
            }
        });
        
        // Find the highest scoring pattern
        const result = Object.entries(patterns).reduce((a, b) => a[1] > b[1] ? a : b);
        
        // Return corresponding position
        switch (result[0]) {
            case 'stroke':
                return 'Stroke Seat - You\'re a natural leader who sets the pace!';
            case 'engine':
                return 'Engine Room - You\'re the powerhouse of the boat!';
            case 'technical':
                return 'Bow Pair - You\'re technically precise and adaptable!';
            case 'cox':
                return 'Coxswain - You\'re the strategic mind of the crew!';
            default:
                return 'Versatile Rower - You show qualities valuable in multiple positions!';
        }
    }
    
    function restartQuiz() {
        // Reset answers
        answers.length = 0;
        currentQuestion = 1;
        
        // Show progress bar again
        document.querySelector('.progress-bar').style.display = 'block';
        document.querySelector('.progress').style.width = '20%';
        
        // Hide result
        document.querySelector('.result').style.display = 'none';
        
        // Show all questions but make only first active
        document.querySelectorAll('.question').forEach(q => {
            q.style.display = 'block';
            q.classList.remove('active');
        });
        document.querySelector('[data-question="1"]').classList.add('active');
        
        // Remove selected class from all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
    }
});