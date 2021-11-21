const languages = {
  createDiagnosticCollection: jest.fn(),
};

const StatusBarAlignment = {};

const window = {
  createStatusBarItem: jest.fn(() => ({
    show: jest.fn(),
  })),
  showErrorMessage: jest.fn(),
  showWarningMessage: jest.fn(),
  createTextEditorDecorationType: jest.fn(),
  registerFileDecorationProvider: jest.fn(),
};

const workspace = {
  getConfiguration: jest.fn(),
  workspaceFolders: [],
  onDidSaveTextDocument: jest.fn(),
  onDidChangeConfiguration: jest.fn(),
};

const OverviewRulerLane = {
  Left: null,
};

const Uri = {
  file: (f) => f,
  parse: jest.fn(),
};
const Range = jest.fn();
const Diagnostic = jest.fn();
const DiagnosticSeverity = { Error: 0, Warning: 1, Information: 2, Hint: 3 };

const debug = {
  onDidTerminateDebugSession: jest.fn(),
  startDebugging: jest.fn(),
};

const commands = {
  executeCommand: jest.fn(),
};

const TreeItemCollapsibleState = {
  None: "None",
  Expanded: "Expanded",
  Collapsed: "Collapsed",
};

class TreeItem {}

class EventEmitter {
  get event() {}
  fire() {}
}

const vscode = {
  languages,
  StatusBarAlignment,
  window,
  workspace,
  OverviewRulerLane,
  Uri,
  Range,
  Diagnostic,
  DiagnosticSeverity,
  debug,
  commands,
  TreeItemCollapsibleState,
  TreeItem,
  EventEmitter,
};

module.exports = vscode;
