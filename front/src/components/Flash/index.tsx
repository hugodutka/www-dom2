import { JSX, Component } from "@/utils/relax";

export const Flash: Component = ({
  messages,
  remove,
}: {
  messages: { id: number; text: string; variant: string }[];
  remove(id: number): void;
}) => (
  <div className="flash-alerts">
    {messages.map(({ id, text, variant }) => (
      <div className={`alert alert-${variant} flash-alert`} role="alert">
        {text}&nbsp;
        <button type="button" className={`btn-sm btn-flash`} onclick={() => remove(id)}>
          ✖️
        </button>
      </div>
    ))}
  </div>
);
