'use client';

export default function HeroChatMockup() {
  return (
    <div className="hero-chat-window">
      <div className="hero-chat-titlebar">
        <div className="hero-chat-dots">
          <span className="hero-chat-dot hero-chat-dot-r" />
          <span className="hero-chat-dot hero-chat-dot-y" />
          <span className="hero-chat-dot hero-chat-dot-g" />
        </div>
        <span className="hero-chat-titlebar-label">AI AGENT</span>
      </div>

      <div className="hero-chat-messages">
        {/* AI greeting */}
        <div className="hero-chat-msg">
          <div className="hero-chat-avatar hero-chat-avatar-ai">AI</div>
          <div>
            <div className="hero-chat-label">AI Agent</div>
            <div className="hero-chat-bubble hero-chat-bubble-ai">
              What can I help you with?
            </div>
          </div>
        </div>

        {/* User message */}
        <div className="hero-chat-msg hero-chat-msg-user">
          <div className="hero-chat-avatar hero-chat-avatar-user">You</div>
          <div>
            <div className="hero-chat-label hero-chat-label-user">You</div>
            <div className="hero-chat-bubble hero-chat-bubble-user">
              Send a follow-up email to my latest lead.
            </div>
          </div>
        </div>

        {/* AI tool call */}
        <div className="hero-chat-msg">
          <div className="hero-chat-avatar hero-chat-avatar-ai">AI</div>
          <div>
            <div className="hero-chat-label">AI Agent · MCP Tool Calling…</div>
            <div className="hero-chat-tool-call">
              <div className="hero-chat-tool-icon">
                <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="1" y="1" width="10" height="10" rx="2" />
                  <path d="M4 6h4M6 4v4" />
                </svg>
              </div>
              <div>
                <div className="hero-chat-tool-label">Send Email via Gmail</div>
                <div className="hero-chat-tool-status">Action in Progress…</div>
              </div>
              <div className="hero-chat-status-dot" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-chat-input-bar">
        <input
          className="hero-chat-input"
          type="text"
          placeholder="Message your agent…"
          readOnly
          tabIndex={-1}
        />
        <div className="hero-chat-send">
          <svg viewBox="0 0 12 12" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 1.5L1.5 6l4 1 1 4 4-9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
