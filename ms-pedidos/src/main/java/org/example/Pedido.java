package org.example;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pedidos")
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idUsuario;
    private Long idProduto;
    private Integer quantidade;
    private String status;
}
