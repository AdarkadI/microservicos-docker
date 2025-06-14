package org.example;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pagamentos")
@Data
public class Pagamento {
    @Id
    private Long id;
    private Long idPedido;
    private Double valor;
    private String status; // Ex: "CONFIRMADO", "FALHA"
}
