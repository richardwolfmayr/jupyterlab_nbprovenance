"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("@jupyterlab/application");
require("../style/index.css");
const notebook_1 = require("@jupyterlab/notebook");
const side_bar_1 = require("./side-bar");
const notebook_provenance_1 = require("./notebook-provenance");
/**
 * Initialization data for the jupyterlab_nbprovenance extension.
 */
const plugin = {
    id: 'jupyterlab_nbprovenance',
    autoStart: true,
    requires: [application_1.ILayoutRestorer, notebook_1.INotebookTracker],
    activate,
};
exports.default = plugin;
exports.notebookModelCache = new Map();
function activate(app, restorer, nbTracker) {
    let provenanceView;
    nbTracker.widgetAdded.connect((_, nbPanel) => {
        // wait until the session with the notebook model is ready
        nbPanel.sessionContext.ready.then(() => {
            const notebook = nbPanel.content;
            if (!exports.notebookModelCache.has(notebook)) {
                exports.notebookModelCache.set(notebook, new notebook_provenance_1.NotebookProvenance(notebook, nbPanel.context, provenanceView));
            }
        });
    });
    provenanceView = new side_bar_1.SideBar(app.shell, nbTracker);
    provenanceView.id = 'nbprovenance-view';
    provenanceView.title.caption = 'Notebook Provenance';
    provenanceView.title.iconClass = 'jp-nbprovenanceIcon';
    restorer.add(provenanceView, 'nbprovenance_view');
    app.shell.add(provenanceView, 'right', { rank: 700 }); // rank was chosen arbitrarily
}
//# sourceMappingURL=index.js.map