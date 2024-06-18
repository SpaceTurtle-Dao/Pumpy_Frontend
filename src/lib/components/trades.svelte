<script lang="ts">
    import File from "lucide-svelte/icons/file";
    import Home from "lucide-svelte/icons/home";
    import LineChart from "lucide-svelte/icons/line-chart";
    import ListFilter from "lucide-svelte/icons/list-filter";
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import Package from "lucide-svelte/icons/package";
    import Package2 from "lucide-svelte/icons/package-2";
    import PanelLeft from "lucide-svelte/icons/panel-left";
    import CirclePlus from "lucide-svelte/icons/circle-plus";
    import Search from "lucide-svelte/icons/search";
    import Settings from "lucide-svelte/icons/settings";
    import ShoppingCart from "lucide-svelte/icons/shopping-cart";
    import UsersRound from "lucide-svelte/icons/users-round";
  
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  </script>
  
    <div class="flex flex-col ">
      <main class="grid flex-1 items-start">
        <Tabs.Root value="trades">
          <div class="flex items-center">
            <Tabs.List>
              <Tabs.Trigger value="trades">Trades</Tabs.Trigger>
              <Tabs.Trigger value="thread">Thread</Tabs.Trigger>
            </Tabs.List>
            <div class="ml-auto flex items-center gap-2">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                  <Button
                    builders={[builder]}
                    variant="outline"
                    size="sm"
                    class="h-8 gap-1"
                  >
                    <ListFilter class="h-3.5 w-3.5" />
                    <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <DropdownMenu.Label>Filter by</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.CheckboxItem checked>
                    Thread
                  </DropdownMenu.CheckboxItem>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <Button size="sm" variant="outline" class="h-8 gap-1">
                <File class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <Tabs.Content value="trades">
            <Card.Root>
              <Card.Header>
                <Card.Title>Transactions</Card.Title>
                <Card.Description>
                  (0 trades from people you follow)
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">Image</span>
                      </Table.Head>
                      <Table.Head>Name</Table.Head>
                      <Table.Head>Type</Table.Head>
                      <Table.Head class="hidden md:table-cell">ICP</Table.Head>
                      <Table.Head class="hidden md:table-cell">
                        Token
                      </Table.Head>
                      <Table.Head class="hidden md:table-cell">
                        Created at
                      </Table.Head>
                      <Table.Head>
                        <span class="hidden md:table-cell">Transaction</span>
                      </Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product example"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./sunny.jpeg"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                        Sunny
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="secondary">Sell</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        $499.99
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">25</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                              builders={[builder]}
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./luna.png"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                        Luna
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline">Buy</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        $129.99
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">100</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2023-10-18 03:21 PM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./sunny.jpeg"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                        Sunny
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline">Buy</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">$39.99</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">50</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2023-11-29 08:15 AM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./luna.png"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                        Luna
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="secondary">Sell</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">$2.99</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">0</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2023-12-25 11:59 PM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./sunny.jpeg"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                       Sunny
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline">Buy</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">$59.99</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">75</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2024-01-01 12:00 AM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell class="hidden sm:table-cell">
                        <img
                          alt="Product"
                          class="aspect-square rounded-md object-cover"
                          height="64"
                          src="./sunny.jpeg"
                          width="64"
                        />
                      </Table.Cell>
                      <Table.Cell class="font-medium">
                        Sunny
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline">Buy</Badge>
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        $199.99
                      </Table.Cell>
                      <Table.Cell class="hidden md:table-cell">30</Table.Cell>
                      <Table.Cell class="hidden md:table-cell">
                        2024-02-14 02:14 PM
                      </Table.Cell>
                      <Table.Cell>
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button
                              builders={[builder]}
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <Ellipsis class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content align="end">
                            <DropdownMenu.Label>Actions</DropdownMenu.Label>
                            <DropdownMenu.Item>Edit</DropdownMenu.Item>
                            <DropdownMenu.Item>Delete</DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Card.Content>
              <Card.Footer>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> trades
                </div>
              </Card.Footer>
            </Card.Root>
          </Tabs.Content>
        </Tabs.Root>
      </main>
    </div>
  