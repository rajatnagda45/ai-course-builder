const courseForm = document.getElementById('courseForm');
const courseTitle = document.getElementById('courseTitle');
const courseDescription = document.getElementById('courseDescription');
const courseLevel = document.getElementById('courseLevel');
const newModule = document.getElementById('newModule');
const addModuleBtn = document.getElementById('addModuleBtn');
const modulesList = document.getElementById('modulesList');
const coursePreview = document.getElementById('coursePreview');
const previewModules = document.getElementById('previewModules');
const themeToggle = document.getElementById('themeToggle');

let modules = [];

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
}

// Add module
addModuleBtn.addEventListener('click', () => {
  const moduleName = newModule.value.trim();
  if (moduleName) {
    modules.push(moduleName);
    renderModules();
    renderPreviewModules();
    newModule.value = '';
  }
});

// Render module list with editable serial numbers
function renderModules() {
  modulesList.innerHTML = '';
  modules.forEach((mod, index) => {
    const div = document.createElement('div');
    div.classList.add('module-item');
    div.innerHTML = `
      <input type="number" 
             class="serial-input" 
             value="${index + 1}" 
             min="1" 
             style="width:50px; margin-right:8px; padding:4px; border-radius:4px; border:1px solid #ccc; text-align:center;" />
      <span style="flex:1;">${mod}</span>
      <button onclick="removeModule(${index})" style="margin-left:auto; background:red; color:white; border:none; padding:2px 6px; border-radius:4px; cursor:pointer;">❌</button>
    `;
    modulesList.appendChild(div);
  });

  // Enable manual reordering
  const serialInputs = modulesList.querySelectorAll('.serial-input');
  serialInputs.forEach((input, idx) => {
    input.addEventListener('change', () => {
      const newPosition = parseInt(input.value);
      if (!isNaN(newPosition) && newPosition >= 1 && newPosition <= modules.length) {
        const [movedModule] = modules.splice(idx, 1);
        modules.splice(newPosition - 1, 0, movedModule);
        renderModules();
        renderPreviewModules();
      } else {
        input.value = idx + 1;
      }
    });
  });
}

// Remove a module
function removeModule(index) {
  modules.splice(index, 1);
  renderModules();
  renderPreviewModules();
}

// Render preview modules with serial numbers
function renderPreviewModules() {
  previewModules.innerHTML = modules
    .map((m, i) => `<li>${i + 1}. ${m}</li>`)
    .join('');
}

// Update preview on form submit
courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  coursePreview.querySelector('h3').textContent = courseTitle.value || 'Untitled Course';
  coursePreview.querySelector('p').textContent = courseDescription.value || 'No description provided.';
  coursePreview.querySelector('.badge').textContent = courseLevel.value;
  renderPreviewModules();
});

// Toggle dark mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️ Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});
