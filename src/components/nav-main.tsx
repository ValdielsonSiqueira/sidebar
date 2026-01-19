"use client";

import { useState, useEffect } from "react";
import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@valoro/ui";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleNovaTransacao = () => {
    window.dispatchEvent(new CustomEvent("@FIAP/OPEN_TRANSACTION_DRAWER"));
    setActiveItem("Nova Transação");
  };

  useEffect(() => {
    const handleClose = () => {
      setActiveItem(null);
    };

    window.addEventListener("@FIAP/CLOSE_TRANSACTION_DRAWER", handleClose);

    return () => {
      window.removeEventListener("@FIAP/CLOSE_TRANSACTION_DRAWER", handleClose);
    };
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Nova Transação"
              isActive={activeItem === "Nova Transação"}
              onClick={handleNovaTransacao}
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Nova Transação</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const handleClick = () => {
              setActiveItem(item.title);

              if (item.title === "Dashboard") {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else if (item.title === "Movimentações") {
                const MovimentaçõesElement =
                  document.getElementById("Movimentações");
                if (MovimentaçõesElement) {
                  MovimentaçõesElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              } else if (item.title === "Transações") {
                const tableElement =
                  document.getElementById("transacoes-table");
                if (tableElement) {
                  tableElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              } else if (item.title === "Extrato") {
                const extratoElement = document.getElementById("extrato");
                if (extratoElement) {
                  extratoElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }
            };

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={activeItem === item.title}
                  onClick={handleClick}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
