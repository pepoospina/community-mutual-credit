import { LitElement, html, property } from 'lit-element';

import '@material/mwc-tab';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { sharedStyles } from './sharedStyles';
import { moduleConnect } from '@uprtcl/micro-orchestrator';
import { ApolloClientModule } from '@uprtcl/graphql';
import { ApolloClient, gql } from 'apollo-boost';

export class CMHome extends moduleConnect(LitElement) {
  @property({ type: Number })
  selectedTabIndex: number = 2;

  @property({ type: Boolean })
  numVouches: number = 0;

  static get styles() {
    return sharedStyles;
  }

  async firstUpdated() {
    const client: ApolloClient<any> = await this.request(
      ApolloClientModule.bindings.Client
    );

    const result = await client.query({
      query: gql`
        {
          me {
            id
            username
            numVouches
          }
        }
      `,
    });

    this.numVouches = result.data.me.numVouches;
  }

  renderPlaceholder() {
    return html` <span>
      You only have ${this.numVouches}, but you need N to enter the network
    </span>`;
  }

  renderContent() {
    if (this.selectedTabIndex === 2) {
      return html`<hcst-agent-list></hcst-agent-list>`;
    }

    if (this.numVouches === 0) return this.renderPlaceholder();

    if (this.selectedTabIndex === 0) {
      return html` <hcmc-transaction-list></hcmc-transaction-list>`;
    } else {
      return html`<hcmc-offer-list></hcmc-offer-list>`;
    }
  }

  render() {
    return html`
      <div class="column">
        <mwc-top-app-bar-fixed>
          <span slot="title">Holochain community currency</span>

          <mwc-button label="Create offer"></mwc-button>
        </mwc-top-app-bar-fixed>

        <mwc-tab-bar
          @MDCTabBar:activated=${(e) =>
            (this.selectedTabIndex = e.detail.index)}
        >
          <mwc-tab label="Home"> </mwc-tab>
          <mwc-tab label="Offers"></mwc-tab>
          <mwc-tab label="Members"> </mwc-tab>
        </mwc-tab-bar>

        <div class="content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
}
