async function loadModels() {
  try {
    const res = await fetch('models.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load models.json');
    const data = await res.json();
    const grid = document.getElementById('models');

    data.models.forEach(m => {
      const el = document.createElement('article');
      el.className = 'model';
      el.innerHTML = `
        <h3>${m.name}</h3>
        <div class="kv"><span>Placement:</span> ${m.integration}</div>
        <div class="kv"><span>Use case:</span> ${m.use_case}</div>
        <div class="kv"><span>Inputs:</span> ${m.data_input}</div>
        <div class="kv"><span>Outputs:</span> ${m.data_output}</div>
        <div class="kv"><span>Validation:</span> ${m.validation}</div>
        <details class="tip"><summary>Details</summary>
          <div class="kv"><span>Role in NF:</span> ${m.role}</div>
          <div class="kv"><span>NFs (sources):</span> ${m.nfs_sources}</div>
          <div class="kv"><span>NFs (consumers):</span> ${m.nfs_consumers}</div>
          <div class="kv"><span>Environment:</span> ${m.environment}</div>
          <div class="kv"><span>Links:</span> ${m.links}</div>
        </details>
      `;
      grid.appendChild(el);
    });
  } catch (e) {
    const grid = document.getElementById('models');
    grid.innerHTML = '<p>Could not load Model Cards. Ensure <code>models.json</code> is present in the repository.</p>';
    console.error(e);
  }
}
loadModels();
