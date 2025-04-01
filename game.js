document.addEventListener('DOMContentLoaded', () => {
  const dragItem = document.getElementById('drag1');
  const dropArea = document.getElementById('drop-area');
  const completionMessage = document.getElementById('completion-message');

  // **Unified Drag and Drop for Desktop and Mobile**
  let isDragging = false;

  // --- Common Event Handlers ---
  const handleDragStart = (event) => {
      isDragging = true;
      event.dataTransfer.setData('text/plain', dragItem.id);
      console.log('Drag start');
  };

  const handleDragOver = (event) => {
      event.preventDefault();
  };

  const handleDrop = (event) => {
      event.preventDefault();
      if (!isDragging) return; // Prevent accidental drops
      isDragging = false;

      const id = event.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(id);
      dropArea.appendChild(draggedElement);
      completionMessage.style.display = "block";
      console.log('Drop');
  };

  const handleTouchStart = (event) => {
      isDragging = true;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      console.log('Touch start');
  };

  const handleTouchMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();

      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      dragItem.style.left = (touchX - touchStartX) + 'px';
      dragItem.style.top = (touchY - touchStartY) + 'px';
  };

  const handleTouchEnd = (event) => {
      if (!isDragging) return;
      isDragging = false;

      const dropAreaRect = dropArea.getBoundingClientRect();
      const dragItemRect = dragItem.getBoundingClientRect();

      if (dragItemRect.left > dropAreaRect.left &&
          dragItemRect.right < dropAreaRect.right &&
          dragItemRect.top > dropAreaRect.top &&
          dragItemRect.bottom > dropAreaRect.bottom) {
          dropArea.appendChild(dragItem);
          completionMessage.style.display = "block";
          dragItem.style.position = 'static'; // Reset positioning
          console.log('Touch end - dropped in area');
      } else {
          // Reset position if not dropped in the correct area
          dragItem.style.left = '';
          dragItem.style.top = '';
          console.log('Touch end - dropped outside area');
      }
  };

  // --- Assign Event Listeners ---
  // Desktop
  dragItem.addEventListener('dragstart', handleDragStart);
  dropArea.addEventListener('dragover', handleDragOver);
  dropArea.addEventListener('drop', handleDrop);

  // Mobile
  dragItem.addEventListener('touchstart', handleTouchStart);
  dragItem.addEventListener('touchmove', handleTouchMove, { passive: false });
  dragItem.addEventListener('touchend', handleTouchEnd);
});