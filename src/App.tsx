import React, { useState } from 'react';
import { FormRenderer } from './components/FormRenderer';
import { sampleFormConfigs } from './data/sampleForms';
import { FileText, Code, Database, Sparkles } from 'lucide-react';

function App() {
  const [currentConfig, setCurrentConfig] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setShowJson(false); // Switch to results view when form is submitted
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Dynamic Form Creator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Build beautiful, responsive forms dynamically from JSON schema configuration
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="bg-white px-3 py-1 rounded-full">✓ Real-time validation</span>
            <span className="bg-white px-3 py-1 rounded-full">✓ Nested forms</span>
            <span className="bg-white px-3 py-1 rounded-full">✓ File uploads</span>
            <span className="bg-white px-3 py-1 rounded-full">✓ Responsive design</span>
          </div>
        </div>

        {/* Form Configuration Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Choose a Form Template
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {sampleFormConfigs.map((config, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentConfig(index);
                  setSubmittedData(null); // Clear previous results when switching forms
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  currentConfig === index
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setShowJson(!showJson)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <Code className="w-4 h-4" />
            {showJson ? 'Hide JSON Schema' : 'Show JSON Schema'}
          </button>
          <button
            onClick={() => setSubmittedData(null)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <Database className="w-4 h-4" />
            Clear Results
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                {sampleFormConfigs[currentConfig].name}
              </h2>
            </div>
            
            <FormRenderer
              schema={sampleFormConfigs[currentConfig].schema}
              onSubmit={handleFormSubmit}
            />
          </div>

          {/* JSON/Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {showJson ? (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Code className="w-6 h-6 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-800">JSON Schema</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(sampleFormConfigs[currentConfig].schema, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <Database className="w-6 h-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Form Output</h3>
                </div>
                {submittedData ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-green-800 font-medium">Form submitted successfully!</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(submittedData, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                    <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium mb-2">No form data yet</p>
                    <p className="text-gray-500">Submit the form to see the JSON output here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;