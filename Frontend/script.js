document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    const taskTable = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    const completeSelectedButton = document.getElementById('complete-selected');
    const deleteSelectedButton = document.getElementById('delete-selected');

    // Função para formatar a data no formato brasileiro (dd/mm/aaaa)
    function formatDateBR(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Adicionar uma nova tarefa
    addTaskButton.addEventListener('click', function() {
        const taskInput = document.getElementById('new-task');
        const endDateInput = document.getElementById('task-end-date');
        const taskText = taskInput.value.trim();
        const endDate = endDateInput.value;

        if (taskText === '' || endDate === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const now = new Date();
        const insertionDate = formatDateBR(now);
        const insertionTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newRow = taskTable.insertRow();
        
        // Adiciona célula para checkbox
        const selectCell = newRow.insertCell(0);
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        selectCell.appendChild(checkbox);

        // Adiciona célula para a tarefa
        const taskCell = newRow.insertCell(1);
        taskCell.textContent = taskText;

        // Adiciona célula para a data final
        const endDateCell = newRow.insertCell(2);
        endDateCell.textContent = endDate.split('-').reverse().join('/'); // Formata a data final no formato brasileiro

        // Adiciona célula para a data de inserção
        const insertionDateCell = newRow.insertCell(3);
        insertionDateCell.textContent = insertionDate;

        // Adiciona célula para a hora
        const timeCell = newRow.insertCell(4);
        timeCell.textContent = insertionTime;

        // Limpa os campos após adicionar
        taskInput.value = '';
        endDateInput.value = '';
    });

    // Marcar tarefas selecionadas como concluídas
    completeSelectedButton.addEventListener('click', function() {
        const rows = document.querySelectorAll('#task-table tbody tr');
        rows.forEach(row => {
            if (row.querySelector('input[type="checkbox"]').checked) {
                row.classList.add('completed');
            }
        });
    });

    // Excluir tarefas selecionadas
    deleteSelectedButton.addEventListener('click', function() {
        const rows = document.querySelectorAll('#task-table tbody tr');
        rows.forEach(row => {
            if (row.querySelector('input[type="checkbox"]').checked) {
                row.remove();
            }
        });
    });

    // Adiciona funcionalidade aos botões "Concluir" e "Excluir" nas linhas
    taskTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('completed-btn')) {
            const row = event.target.closest('tr');
            row.classList.add('completed');
        }

        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            row.remove();
        }
    });
});
